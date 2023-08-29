const toogle_btn =
  document.querySelectorAll(".toggle");
const main = document.querySelector("main");

toogle_btn.forEach((btn) => {
  btn.addEventListener('click',
    () => {
      main.classList.toggle("sign-up-mode");
    });
});
