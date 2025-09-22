const list = document.getElementById("cookie-list");
const loadBtn = document.getElementById("load-btn");
const BATCH = 6; // how many to add each click
let currentIdx = 0; // how many already rendered
let allCookies = []; // full JSON array

/* first grab the data */
fetch("cookies.json")
  .then((r) => r.json())
  .then((data) => {
    allCookies = data;
    renderBatch(); // first load
  })
  .catch((err) => console.error(err));

/* create one <li> */
function makeCard(cookie) {
  const li = document.createElement("li");
  li.innerHTML = `
    <h3>${cookie.name}</h3>
    <span class="flag">${cookie.country}</span>
    <img src="${cookie.img}" alt="${cookie.name}" loading="lazy">
    <p>${cookie.description}</p>
  `;
  return li;
}

/* add next batch */
function renderBatch() {
  const end = Math.min(currentIdx + BATCH, allCookies.length);
  const fragment = document.createDocumentFragment();
  for (; currentIdx < end; currentIdx++) {
    fragment.appendChild(makeCard(allCookies[currentIdx]));
  }
  list.appendChild(fragment);

  /* toggle button text / hide if nothing left */
  if (currentIdx >= allCookies.length) {
    loadBtn.textContent = "Show fewer";
  } else {
    loadBtn.textContent = "Load more";
  }
}

/* button behaviour */
loadBtn.addEventListener("click", () => {
  if (currentIdx >= allCookies.length) {
    // already full → reset
    list.innerHTML = "";
    currentIdx = 0;
    renderBatch();
  } else {
    renderBatch();
  }
});
