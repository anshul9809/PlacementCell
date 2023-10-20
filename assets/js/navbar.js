const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const navLink = document.querySelectorAll(".top-nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));
function closeMenu() {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
}
function mobileMenu() {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
}