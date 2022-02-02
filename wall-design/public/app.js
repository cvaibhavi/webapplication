const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

//Dispaly Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click',mobileMenu);
 
//preloader
var loader = document.getElementById("preloader");
window.addEventListener("load",function(){
   loader.style.display = "none";
})



