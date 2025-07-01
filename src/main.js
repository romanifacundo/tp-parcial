import './style.css';

const app = document.getElementById('app');
app.innerHTML = `<p>¡Bienvenido a la app de Rick and Morty!</p>`;

const container = document.getElementById('characters-container');

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    const characters = data.results;

    characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('character-card');

      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Especie: ${character.species}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    container.innerHTML = `<p>Error al cargar los personajes</p>`;
    console.error('Error:', error);
  });


