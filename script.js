const fetchPokemon = async () => {
    const APIResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=21');

    const data = await APIResponse.json();

    return data;
}

const renderPokemon = async () => {

    const data = await fetchPokemon();
   
    const element=document.getElementById('container-pokebolas')
    let   pokebolas=''
    data.results.forEach(pokemon => { 
       
        pokebolas+= `<div class="image"><a href="#container-pokemon"><button onclick="handleClickPokemon('${pokemon.name}')" class="button">
        <img src="pokebola.png" alt="imagem mostrando uma pokebola vermelha" />
        </button></a>
      </div>`

      
        
    })
   
    element.innerHTML=pokebolas
    


}

async function handleClickPokemon(name) {
    console.log(name)
    const pokemonElement = document.getElementById("container-pokemon");
    const pokemon = await getPokemon(name);
    let imagesHtml = "";
    Object.values(pokemon.sprites).forEach((image2) => {
      if (typeof image2 === "string")
        imagesHtml += `<img class="image2" src='${image2}' />`;
    });
    const pokemonHtml = `
      <div class="container-info">
        <span class="title">${name}</span>
        <span class="info">O pokemon ${name} possui uma altura de ${
      pokemon.height / 10
    }m, podendo chegar até 
        ${pokemon.weight / 10}kg, possuindo um HP base de ${
      pokemon.stats[0].base_stat
    } pontos.
        Possui um total de ${pokemon.moves.length} movimentos e aparece em 
        ${pokemon.game_indices.length} jogos da franquia.</span>
        <div class="container-images">
          ${imagesHtml}
        </div>
      </div>
    `;
  
    pokemonElement.innerHTML = pokemonHtml;
  }
  
  async function renderPokemons() {
    const pokemons = await getPokemons();
    const containerElement = document.getElementById("container-pokemons");
    let pokemonsHtml = "";
  
    pokemons.forEach(({ name }) => {
      pokemonsHtml += `<button onclick="handleClickPokemon('${name}')" class='container-pokemon'>${name}</div>`;
    });
  
    containerElement.innerHTML = pokemonsHtml;
  }

  async function getPokemon(name){
    const response =await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    return data
  }

 
    ////////////

    ////////////
    document.addEventListener("DOMContentLoaded", function() {
      const botaoAoTopo = document.getElementById("voltarAoTopo");
    
      botaoAoTopo.addEventListener("click", function() {
        scrollToTop();
      });
    
      window.addEventListener("scroll", function() {
        toggleBotaoAoTopo();
      });
    
      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    
      function toggleBotaoAoTopo() {
        if (window.scrollY > 300) {
          botaoAoTopo.style.display = "block";
        } else {
          botaoAoTopo.style.display = "none";
        }
      }
    });
 
  renderPokemons();

renderPokemon('10')


