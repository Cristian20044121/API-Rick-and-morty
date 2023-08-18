const containerPagination = document.querySelector('.pagination');

containerPagination.addEventListener('click', async (e) => {
  e.preventDefault();

  if (e.target.classList.contains('page-link')) { // Cambia 'x' por la clase correcta de los elementos de paginación
    const page = e.target.textContent; // Obtiene el número de página del contenido del elemento clicado

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await response.json();

      let html = '';

      data.results.forEach(card => {
        html += `
          <div class="container-card">
            <img src="${card.image}" alt="image of character" class="image">
            <div class="container-text">
              <h3>${card.name}</h3>
              <p>${card.status} - ${card.species}</p>
              <div class="container3">
                <div class="container-info">
                  <p><span>GENDER:</span> ${card.gender}</p>
                  <p><span>LOCATION:</span> <a href="${card.location.url}" target="_blank">${card.location.name}</a></p>
                </div>
              </div>
              <div class="container-type">
                <p>${card.type}</p>
              </div>
            </div>
          </div>
        `;
      });

      let container = document.querySelector('.container');
      container.innerHTML = html;

    } catch (err) {
      console.error(err);
    }
  }
});
