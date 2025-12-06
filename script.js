const list = document.getElementById("cookie-list");
const loadBtn = document.getElementById("load-btn");
const searchInp = document.getElementById("search-input");
const BATCH = 6;
let currentIdx = 0;
let allCookies = [];
let filtered = [];

/* ---------- fetch ---------- */
fetch("cookies.json")
  .then((r) => r.json())
  .then((data) => {
    allCookies = data;
    filtered = allCookies;
    renderBatch();
  })
  .catch((err) => console.error(err));

/* ---------- card ---------- */
function makeCard(c) {
  const li = document.createElement("li");
  li.innerHTML = `
    <h3>${c.name ?? "Unnamed"}</h3>
    <span class="flag">${c.country ?? ""}</span>
    <img src="${c.img ?? ""}" alt="${c.name ?? ""}" loading="lazy">
    <p>${c.description ?? ""}</p>`;
  return li;
}

/* ---------- render ---------- */
function renderBatch() {
  const end = Math.min(currentIdx + BATCH, filtered.length);
  const fragment = document.createDocumentFragment();
  for (; currentIdx < end; currentIdx++) {
    fragment.appendChild(makeCard(filtered[currentIdx]));
  }
  list.appendChild(fragment);

  loadBtn.textContent = currentIdx >= filtered.length ? "Reset" : "Load more";
}

/* ---------- button ---------- */
loadBtn.addEventListener("click", () => {
  if (currentIdx >= filtered.length) {
    // reset
    list.innerHTML = "";
    currentIdx = 0;
    renderBatch();
  } else {
    renderBatch();
  }
});

/* ---------- search ---------- */
searchInp.addEventListener("input", () => {
  const q = searchInp.value.trim().toLowerCase();
  filtered = q
    ? allCookies.filter((c) => c.name.toLowerCase().includes(q))
    : allCookies;
  list.innerHTML = "";
  currentIdx = 0;
  renderBatch();
});
