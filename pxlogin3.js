const toggle_btn =
  document.querySelectorAll(".toggle");
const main = document.querySelector("main");

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});
