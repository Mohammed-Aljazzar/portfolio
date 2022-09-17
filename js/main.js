  var typed3 = new Typed('#title', {
    strings: ['Web Developer'],
    typeSpeed: 200,
    backSpeed: 100,
    smartBackspace: true, // this is a default
    loop: true
  });



       new WOW().init();

      
       var loading = document.querySelector('.loading');

       document.onreadystatechange = function() {
             if(document.readyState === 'complete') {
              loading.style.visibility = 'hidden';
             }
       }


   var nav = document.querySelector('.main');
   var navbar_brand = document.querySelector('.navbar-brand');
   var backToTop = document.querySelector('.backToTop');
   var change = document.querySelectorAll('.navbar-nav  li a');
                                                                
  window.onscroll = function () {
    if(window.scrollY > 50){
        nav.style.backgroundColor = '#799de1e5';
        navbar_brand.style.color = '#fff';
        backToTop.style.display = 'block';
        change.forEach(element => {
             element.style.color = 'white';
        });

    }else if(window.scrollY == 0){
         nav.style.backgroundColor = null;
         navbar_brand.style.color = null;
         backToTop.style.display = null;
         change.forEach(element => {
             element.style.color = null;
        });
        
    }
  }
backToTop.onclick = function(){
     window.scrollTo({
      top: 0,
      left: 0 ,
      behavior: 'smooth'
     })
}



const sr = ScrollReveal({
     distance: '25px',
     duration: 2500,   
     reset: true,  
})
sr.reveal('#cover .container' , {delay: 200 , origin: 'bottom'})
sr.reveal('#about , #skills , #projects , .discount , #clients , #blog , #team , .achievements , #contact' , {delay: 190 , origin: 'bottom'})





