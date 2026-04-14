window.addEventListener("DOMContentLoaded", () => {
document.body.classList.add("dark");

const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
});

const loading = document.querySelector("#loading");
const showFavsBtn = document.querySelector("#showFavs");
const container = document.querySelector("#agents");
const searchInput = document.querySelector("#search");
const roleFilter = document.querySelector("#roleFilter");

let allAgents = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* =========================
   POPUP (MODAL)
========================= */
const modalAbilities = document.querySelector("#modalAbilities");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

const modalImg = document.querySelector("#modalImg");
const modalName = document.querySelector("#modalName");
const modalRole = document.querySelector("#modalRole");

const openModal = (agent) => {
  modalImg.src = agent.displayIcon;
  modalName.textContent = agent.displayName;
  modalRole.textContent = agent.role?.displayName || "No role";

  let abilitiesHTML = "";

  agent.abilities.forEach((ability, index) => {
   if (!ability.displayName) return;

    const isUltimate = ability.slot === "Ultimate";

    abilitiesHTML += `
      <div class="ability ${isUltimate ? "ultimate" : ""}">
      
        <div class="ability-header" data-index="${index}">
          ${ability.displayIcon ? `<img src="${ability.displayIcon}" class="ability-icon" />` : ""}
          <h3>${ability.displayName} ${isUltimate ? "⭐" : ""}</h3>
        </div>

        <p class="ability-text hidden">${ability.description}</p>

      </div>
    `;
  });

  modalAbilities.innerHTML = abilitiesHTML;

  /* klik gedrag */
  document.querySelectorAll(".ability-header").forEach(header => {
   header.addEventListener("click", () => {
      const text = header.nextElementSibling;
      text.classList.toggle("hidden");
    });
  });

  modal.classList.add("show");
};

/* ❗ BELANGRIJK: sluit knop */
closeModal.onclick = () => {
  modal.classList.remove("show");
};

/* ❗ klik BUITEN popup = sluiten */
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
  }
});

/* =========================
   API
========================= */

const getAgents = async () => {
  loading.style.display = "block";

  const response = await fetch("https://valorant-api.com/v1/agents");
  const data = await response.json();

  allAgents = data.data;

  renderAgents(allAgents);

  loading.style.display = "none";
};

/* =========================
   FAVORITES
========================= */

const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const toggleFavorite = (agent) => {
  const exists = favorites.find(f => f.uuid === agent.uuid);

  if (exists) {
    favorites = favorites.filter(f => f.uuid !== agent.uuid);
  } else {
    favorites.push(agent);
  }

  saveFavorites();
  renderAgents(allAgents);
};

const isFavorite = (agent) => {
  return favorites.some(f => f.uuid === agent.uuid);
};

/* =========================
   RENDER AGENTS
========================= */

const renderAgents = (agents) => {
  let html = "";

  agents.forEach(agent => {
    html += `
      <div class="card" data-id="${agent.uuid}">
        <img src="${agent.displayIcon}" />
        <h2>${agent.displayName}</h2>
        <p>${agent.role?.displayName || "No role"}</p>

        <button class="fav-btn" data-id="${agent.uuid}">
          ${isFavorite(agent) ? "❤️" : "🤍"}
        </button>
      </div>
    `;
  });

  container.innerHTML = html;

  /* FAVORITE BUTTONS */
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // BELANGRIJK (voorkomt popup conflict)

      const agent = allAgents.find(a => a.uuid === btn.dataset.id);
      toggleFavorite(agent);
    });
  });

  /* CARD CLICK → POPUP */
  container.addEventListener("click", (e) => {
  let card = e.target;

  while (card && !card.classList.contains("card")) {
    card = card.parentElement;
  }

  if (!card) return;

  const agent = allAgents.find(a => a.uuid === card.dataset.id);
  openModal(agent);
});
};

/* =========================
   FILTERS
========================= */

const applyFilters = () => {
  let filtered = allAgents;

  const searchValue = searchInput.value.toLowerCase();
  filtered = filtered.filter(agent =>
    agent.displayName.toLowerCase().includes(searchValue)
  );

  const roleValue = roleFilter.value;

  if (roleValue !== "all") {
    filtered = filtered.filter(agent =>
      agent.role?.displayName === roleValue
    );
  }

  renderAgents(filtered);
};

searchInput.addEventListener("input", applyFilters);
roleFilter.addEventListener("change", applyFilters);

showFavsBtn.addEventListener("click", () => {
  renderAgents(favorites);
});

getAgents();
});