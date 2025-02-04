// JavaScript for Hamburger Menu
const menuIcon = document.getElementById("menu-icon");
const navMenuContainer = document.querySelector(".nav-menu-container");

menuIcon.addEventListener("click", () => {
  navMenuContainer.classList.toggle("show");
});
