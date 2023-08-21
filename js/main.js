// trae la primera pagina de personajes al cargar nuestra pagina 

document.addEventListener('DOMContentLoaded', async () => {
  const id = 1; 
  await getPage(id);
});




// crea y agrega las opciones automaticamente al select 

const selectPage = document.getElementById('select');
for (let i = 1; i < 43; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i;
  option.className = 'page-link';
  selectPage.appendChild(option);
}


// función asincronica para traer las paginas que el usuario desee 

selectPage.addEventListener('click',  () => {
  const value = selectPage.value;
  const page = value;

  getPage(page);
  
});


const getPage = async (id) =>{
  const container = document.querySelector('.container');
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${id}`);
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
                <p><span>ORIGIN:</span> ${card.origin.name}</p>
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

    container.innerHTML = html;

  } catch (err) {
    console.error(err);
  }
}