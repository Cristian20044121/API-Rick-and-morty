const cards = async() => {
    try{
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json()

        let html = '';

        data.results.forEach(card => {
           html += `
           <div class="container-card">
    
           <img src="${card.image}" alt="image of character" class="image">
         <div class="container-text">
           <h3>${card.name}</h3>
           <p>${card.status} - ${card.species}</p>
           <div class="container3">
             <div class="div-1">
              <a href="${card.episode}">Episode</a>
             </div>
             <div class="div-2">
                <a href="https://rickandmortyapi.com/api/location">${card.location.name}</a>
             </div>
             
           </div>
           <div class="container4">
             <img src="images/image-avatar.png" alt="image-avatar">
             <p>Creation of <span> Jules Wyvern</span></p>
           </div>
           
         </div>
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