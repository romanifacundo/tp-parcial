import './style.css';

const container = document.getElementById('characters-container');
const filterSpecies = document.getElementById('filter-species');
const sortName = document.getElementById('sort-name');
const searchInput = document.getElementById('search');

// 🎯 Nuevos elementos del DOM para navegación
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const paginationNumbers = document.getElementById('pagination-numbers');

let allCharacters = [];
let currentPage = 1;
const charactersPerPage = 20;

function renderCharacters(characters) {
  container.innerHTML = '';

  const totalPages = Math.ceil(characters.length / charactersPerPage);
  const start = (currentPage - 1) * charactersPerPage;
  const end = start + charactersPerPage;
  const charactersToShow = characters.slice(start, end);

  charactersToShow.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('character-card');
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p><strong>Estado:</strong> ${character.status}</p>
      <p><strong>Especie:</strong> ${character.species}</p>
      <p><strong>Origen:</strong> ${character.origin.name}</p>
      <a href="/detalle.html?id=${character.id}" target="_blank" class="view-detail">Ver más</a>
    `;
    container.appendChild(card);
  });

  updatePaginationUI(characters.length);
}

function updatePaginationUI(totalCharacters) {
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);

  // Actualizar texto "Página X de Y"
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  // Deshabilitar botones si corresponde
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Botones numerados
  paginationNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('pagination-number');
    if (i === currentPage) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      currentPage = i;
      applyFiltersAndSort();
    });
    paginationNumbers.appendChild(btn);
  }
}

function applyFiltersAndSort() {
  let filtered = [...allCharacters];

  const speciesValue = filterSpecies.value;
  const sortValue = sortName.value;
  const searchQuery = searchInput.value.toLowerCase();

  if (speciesValue !== 'all') {
    filtered = filtered.filter(char => char.species === speciesValue);
  }

  if (searchQuery.trim() !== '') {
    filtered = filtered.filter(char =>
      char.name.toLowerCase().includes(searchQuery)
    );
  }

  filtered.sort((a, b) => {
    return sortValue === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  renderCharacters(filtered);
}

// 🔁 Traer TODAS las páginas de personajes
async function fetchAllCharacters() {
  let all = [];

  for (let i = 1; i <= 42; i++) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
      const data = await response.json();
      all = all.concat(data.results);
    } catch (error) {
      console.error(`Error al cargar la página ${i}`, error);
    }
  }

  allCharacters = all;
  applyFiltersAndSort(); // activa la primera carga
}

// 🔃 Eventos de filtros y búsqueda
filterSpecies.addEventListener('change', () => {
  currentPage = 1;
  applyFiltersAndSort();
});
sortName.addEventListener('change', () => {
  currentPage = 1;
  applyFiltersAndSort();
});
searchInput.addEventListener('input', () => {
  currentPage = 1;
  applyFiltersAndSort();
});

// 🔃 Eventos para navegación
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    applyFiltersAndSort();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  applyFiltersAndSort();
});

// 🚀 Iniciar carga
fetchAllCharacters();
