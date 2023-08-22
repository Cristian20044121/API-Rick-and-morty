// trae la primera pagina de episodios al cargar la pagina

document.addEventListener('DOMContentLoaded', async () => {
    const id = 1; 
    await getPage(id);
  });
  
  
  
  
  // crea y agrega las opciones automaticamente al select 
  const selectPage = document.getElementById('select');
  for (let i = 1; i < 4; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.className = 'page-link';
    selectPage.appendChild(option);
  }
  
  
  // crea y agrega las opciones automaticamente al select de busqueda por ID 
  
  const selectCharacter = document.getElementById('select_one_episode');
  for (let i = 1; i < 52; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.className = 'page-link';
    selectCharacter.appendChild(option);
  }
  
  
  
  // función asincronica para traer las paginas que el usuario desee 
  
  selectPage.addEventListener('click', async () => {
    const value = selectPage.value;
    const page = value;
    await getPage(page);
    
  });
  
  const getPage = async (id) =>{
    const container = document.querySelector('.container');
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${id}`);
      const data = await response.json();
  
      let html = '';
  
      data.results.forEach(card => {
        html += `
          <div class="container-card">
          <img src="../img/rick-morty-critica.webp" alt="image of port" class="image">
            <div class="container-text">
              <h3>${card.name}</h3>
                <p>${card.episode} - ${card.air_date}</p>
                <div class="container3">
                <div class="container-info">
                <p><span>URL:</span> <a href="${card.url}" target="_blank">${card.url}</a></p>
                  <p><span>CREATED:</span>${card.created}</p>
                </div>
              </div>
            </div>
            </div>
        `;
      });
  
      container.innerHTML = html;
  
    } catch (err) {
      console.error(err);
    }
  }
  
  
  
  // función asincronica para traer el episodio que desee
  
  selectCharacter.addEventListener('click', async () => {
    const value = selectCharacter.value;
    const page = value;
    await getOneCharacter(page);
  
  });
  
  
  
  const getOneCharacter = async (id) => {
    const container = document.querySelector('.container');
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
      const data = await response.json();
  
      let html = '';
  
      html += `
      <div class="container-card">
      <img src="../img/rick-morty-critica.webp" alt="image of port" class="image">
        <div class="container-text">
          <h3>${card.name}</h3>
            <p>${card.episode} - ${card.air_date}</p>
            <div class="container3">
            <div class="container-info">
            <p><span>URL:</span> <a href="${card.url}" target="_blank">${card.url}</a></p>
              <p><span>CREATED:</span>${card.created}</p>
            </div>
          </div>
        </div>
        </div>
      `;
  
      container.innerHTML = html;
  
    } catch (err) {
      console.error(err);
    }
  };
  
  // ...
  
  // filtrar nombre
  const inputFilter = document.querySelector('.filter')
  inputFilter.addEventListener('input', () => {
    const filterValue = inputFilter.value;
    filterCharactersByName(filterValue);
  });
  
  // función para filtrar personajes por nombre
  const filterCharactersByName = async (name) => {
    const container = document.querySelector('.container');
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/28/?name=${name}`);
      const data = await response.json();
  
      if (data.error) {
        container.innerHTML = `<p>No se encontraron personajes con ese nombre.</p>`;
        return;
      }
  
      const characterCards = data.results.map(card => generateCharacterCard(card)).join('');
      container.innerHTML = characterCards;
  
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p>Error al cargar los personajes.</p>`;
    }
  };
  
  // función para generar la tarjeta de un personaje
  const generateCharacterCard = (card) => {
    return `
    <div class="container-card">
          <img src="../img/rick-morty-critica.webp" alt="image of port" class="image">
            <div class="container-text">
              <h3>${card.name}</h3>
                <p>${card.episode} - ${card.air_date}</p>
                <div class="container3">
                <div class="container-info">
                <p><span>URL:</span> <a href="${card.url}" target="_blank">${card.url}</a></p>
                  <p><span>CREATED:</span>${card.created}</p>
                </div>
              </div>
            </div>
            </div>
    `;
  };
  