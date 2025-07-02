import './style.css';

const container = document.getElementById('characters-container');
const filterSpecies = document.getElementById('filter-species');
const sortName = document.getElementById('sort-name');
const searchInput = document.getElementById('search');

let allCharacters = [];

function renderCharacters(characters) {
  container.innerHTML = '';
  characters.forEach(character => {
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

// Cargar personajes desde la API
fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    allCharacters = data.results;
    renderCharacters(allCharacters);
  })
  .catch(err => {
    container.innerHTML = '<p>Error al cargar personajes</p>';
    console.error(err);
  });

// Eventos
filterSpecies.addEventListener('change', applyFiltersAndSort);
sortName.addEventListener('change', applyFiltersAndSort);
searchInput.addEventListener('input', applyFiltersAndSort);
