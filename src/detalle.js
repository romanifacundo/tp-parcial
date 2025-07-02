import './style.css';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const contenedor = document.getElementById('detalle-personaje');

fetch(`https://rickandmortyapi.com/api/character/${id}`)
  .then(res => res.json())
  .then(personaje => {
    contenedor.innerHTML = `
    <div class="character-card character-detail-card">
      <img src="${personaje.image}" alt="${personaje.name}">
      <div class="character-info">
        <h2>${personaje.name}</h2>
        <p><strong>Estado:</strong> ${personaje.status}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
        <p><strong>Origen:</strong> ${personaje.origin.name}</p>
        <p><strong>Ubicación:</strong> ${personaje.location.name}</p>
      </div>
    </div>
  `;
  
  })
  .catch(err => {
    contenedor.innerHTML = '<p>Error al cargar los detalles.</p>';
    console.error(err);
  });

