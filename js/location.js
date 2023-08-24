document.addEventListener('DOMContentLoaded', async () => {
    const id = 1;
    await getPage(id);
});

const selectPage = document.getElementById('select');
for (let i = 1; i < 8; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.className = 'page-link';
    selectPage.appendChild(option);
}

const selectCharacter = document.getElementById('select_one_location');
for (let i = 1; i < 127; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.className = 'page-link';
    selectCharacter.appendChild(option);
}

selectPage.addEventListener('change', async () => {
    const value = selectPage.value;
    await getPage(value);
});

const getPage = async (id) => {
    const container = document.querySelector('.container');
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${id}`);
        const data = await response.json();

        let html = '';

        data.results.forEach(card => {
            html += generateLocationCard(card);
        });

        container.innerHTML = html;
    } catch (err) {
        console.error(err);
    }
};

selectCharacter.addEventListener('change', async () => {
    const value = selectCharacter.value;
    await getOneLocation(value);
});

const getOneLocation = async (id) => {
    const container = document.querySelector('.container');
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const card = await response.json();

        const html = generateLocationCard(card);

        container.innerHTML = html;
    } catch (err) {
        console.error(err);
    }
};

const inputFilter = document.querySelector('.filter');
inputFilter.addEventListener('input', () => {
    const filterValue = inputFilter.value;
    filterCharactersByName(filterValue);
});

const filterCharactersByName = async (name) => {
    const container = document.querySelector('.container');
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${name}`);
        const data = await response.json();

        if (data.error) {
            container.innerHTML = `<p>No se encontraron ubicaciones con ese nombre.</p>`;
            return;
        }

        const locationCards = data.results.map(card => generateLocationCard(card)).join('');
        container.innerHTML = locationCards;
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p>Error al cargar las ubicaciones.</p>`;
    }
};

const generateLocationCard = (card) => {
    return `
        <div class="container-card">
            <img src="../img/Screaming-Sun-Planet.avif" alt="imagen de la ubicación" class="image">
            <div class="container-text">
                <h3>${card.name}</h3>
                <p>${card.type} - ${card.dimension}</p>
                <div class="container3">
                    <div class="container-info">
                        <p><span>CREATED:</span> ${card.created}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};
