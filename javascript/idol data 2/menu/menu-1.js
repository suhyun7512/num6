document.addEventListener("DOMContentLoaded", function () {
   const navBar = document.querySelector(".custom-nav"),
      menuBtns = document.querySelectorAll(".custom-menu-icon"),
      overlay = document.querySelector(".overlay");

   menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener("click", () => {
         navBar.classList.toggle("open");
      });
   });

   overlay.addEventListener("click", () => {
      navBar.classList.remove("open");
   });
});
