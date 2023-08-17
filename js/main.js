const cards = async() => {
    try{
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json()

        let html = '';

        data.results.forEach(card => {
           html += `
            <div class = "card">
                <img src="${card.image}" alt="image of character">
                <h2>${card.name}</h2>
            </div>
            `
            
        });
        let container = document.querySelector('.container');
        container.innerHTML= html;
        
    }catch (err){
        console.error(err)
    }
}

cards();