const button = document.querySelector(".btn");
const container = document.querySelector(".container ul");
const h2 = document.querySelector(".container h2");
const h1 = document.querySelector("h1");
const p = document.querySelector("p");

button.addEventListener("click", () => {
  container.style.backgroundColor = "red";
  button.style.backgroundColor = "blue";
  h1.textContent = "Work in Progress...";
  h1.style.color = "red";
  h1.style.textDecoration = "underline";
  h2.textContent = "More Coming Soon!";
  h2.style.color = "blue";
  p.style.display = "none";
});
