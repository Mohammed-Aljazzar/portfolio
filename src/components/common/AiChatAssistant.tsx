"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, Phone } from "lucide-react";
import { useParams } from "next/navigation";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  category?: string;
  suggestedQuestions?: string[];
  timestamp: string;
}

export default function AiChatAssistant() {
  const params = useParams();
  const currentLang = params?.lang === "en" ? "en" : "ar";
  const isAr = currentLang === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      sender: "bot",
      text: isAr
        ? "مرحباً بك! أنا **المساعد الذكي** لموقع المهندس **محمد الجزار**. يسعدني إجابتك عن أي استفسار يخص أنظمة ERP (أودو وFrappe)، المشاريع المنفذة، البرامج التدريبية، أو التواصل المباشر."
        : "Hello! I am the **AI Assistant** for Eng. **Mohammed Aljazzar's** portfolio. Ask me anything about his ERP solutions (Odoo & Frappe), tech projects, training workshops, or how to get in touch.",
      suggestedQuestions: isAr
        ? [
            "ما هي خبراته في أودو Odoo؟",
            "أخبرني عن الورش التي قدمها في بيديا وسديم",
            "كيف يمكنني التواصل مع المهندس؟",
            "ما هي أبرز مشاريعه؟"
          ]
        : [
            "What is his Odoo & ERP expertise?",
            "What workshops did he conduct?",
            "How can I contact Mohammed?",
            "Tell me about his top projects"
          ],
      timestamp: new Date().toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, lang: currentLang })
      });

      const data = await res.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || (isAr ? "عذراً، حدث خطأ. يرجى المحاولة لاحقاً." : "Sorry, an error occurred."),
        category: data.category,
        suggestedQuestions: data.suggestedQuestions,
        timestamp: new Date().toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: isAr
          ? "تعذر الاتصال بالخادم حالياً. يمكنك مراسلة المهندس محمد مباشرة عبر واتساب."
          : "Unable to reach server. You can contact Eng. Mohammed directly via WhatsApp.",
        timestamp: new Date().toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: isAr
          ? "أهلاً بك مجدداً! كيف يمكنني مساعدتك الآن؟"
          : "Welcome back! How may I assist you now?",
        suggestedQuestions: isAr
          ? [
              "ما هي خبراته في أودو Odoo؟",
              "أخبرني عن الورش التي قدمها في بيديا وسديم",
              "كيف يمكنني التواصل مع المهندس؟"
            ]
          : [
              "What is his Odoo & ERP expertise?",
              "What workshops did he conduct?",
              "How can I contact Mohammed?"
            ],
        timestamp: new Date().toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Simple Markdown link and bold renderer
  const renderMessageText = (txt: string) => {
    const parts = txt.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\n)/g);
    return parts.map((part, idx) => {
      if (!part) return null;
      if (part === "\n") return <br key={idx} />;

      // Match markdown links [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {label}
          </a>
        );
      }

      // Match bold text **bold**
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-slate-100">{boldMatch[1]}</strong>;
      }

      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 start-6 z-40 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800 text-white shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-teal-300/30 cursor-pointer"
          aria-label={isAr ? "المساعد الذكي للدردشة" : "AI Chat Assistant"}
          title={isAr ? "المساعد الذكي للمهندس محمد الجزار" : "AI Chat Assistant"}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <>
              <Bot className="w-6 h-6 transition-transform duration-200 group-hover:rotate-6" />
              <span className="absolute -top-1 -end-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 animate-pulse" />
            </>
          )}

          {/* Tooltip on Hover */}
          {!isOpen && (
            <span
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-medium shadow-lg backdrop-blur-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-slate-700/50 ${
                isAr ? "right-16" : "left-16"
              }`}
            >
              {isAr ? "المساعد الذكي (اسأل عن أي شيء)" : "AI Assistant (Ask me anything)"}
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="fixed bottom-22 start-4 sm:start-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] h-[540px] max-h-[calc(100vh-7rem)] flex flex-col rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="relative px-4 py-3.5 bg-gradient-to-r from-teal-600 via-teal-700 to-slate-900 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-teal-200">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-teal-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5 leading-tight">
                  <span>{isAr ? "المساعد الذكي" : "AI Portfolio Assistant"}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-teal-100/90 leading-tight">
                  {isAr ? "قاعدة معرفة المهندس محمد الجزار" : "Eng. Mohammed Aljazzar's Bio"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-teal-100 hover:text-white hover:bg-white/10 transition-colors"
                title={isAr ? "إعادة بدء المحادثة" : "Restart chat"}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-teal-100 hover:text-white hover:bg-white/10 transition-colors"
                title={isAr ? "إغلاق" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                    msg.sender === "user"
                      ? "bg-slate-700 dark:bg-slate-600"
                      : "bg-gradient-to-br from-teal-500 to-teal-700"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[80%] space-y-1.5`}>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed text-[12.5px] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-tr-xs"
                        : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 rounded-tl-xs shadow-xs"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>

                  {/* Suggested Question Pills */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/80 hover:bg-teal-100 dark:hover:bg-teal-900/60 hover:border-teal-400 transition-all text-start"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9.5px] text-slate-400 dark:text-slate-500 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs py-1">
                <div className="w-7 h-7 rounded-lg bg-teal-600/20 text-teal-600 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" />
                  <span className="text-[11px] font-medium ms-1">
                    {isAr ? "جاري التفكير..." : "Thinking..."}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct WhatsApp Callout in Footer of Chat */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{isAr ? "استجابة فورية وآمنة" : "Instant & Secure"}</span>
            </span>
            <a
              href="https://wa.me/970598048284"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>{isAr ? "واتساب مباشر" : "Direct WhatsApp"}</span>
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                isAr
                  ? "اكتب سؤالك هنا (مثال: ما هي خبرتك في أودو؟)..."
                  : "Type your query here..."
              }
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
              title={isAr ? "إرسال" : "Send"}
            >
              <Send className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
