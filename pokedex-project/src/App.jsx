import { useState, useEffect } from "react";
import "./App.css";


export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [pokemon, setPokemon] = useState([]);
  const [currentImage, setCurrentImage] = useState({});


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();

      setPokemon(data.results);
    }
    fetchData();
  }, []);






  //Gets more info for clicked pokemon
  async function handleClick(url) {
    const pokemonInfo = await getMoreInfo(url);
    console.log(pokemonInfo);
    setCurrentPokemon(pokemonInfo);

    setCurrentImage(pokemonInfo.sprites.back_default)
  }



  //Handles the sorting of the Pokemon
  let sortedPokemonList = []
 async function handlePeriodChange(val) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${val}`);
    const data = await response.json();

    let list = document.getElementById('mC')
    list.innerHTML = ""

    let sortedPokemon = data.pokemon
    

    for (let index = 0; index < 25; index++) {
      let item = document.createElement('li')
      item = sortedPokemon[index].pokemon.name.toUpperCase()


      sortedPokemonList.push(item)
    }
  
    list.innerText = sortedPokemonList

  }



  //Gets more info on selected Pokemon for card
  async function getMoreInfo(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;

    console.log(data)
  }

 
  //Gets the types of the Pokemon
  let currentPokemonTypesList;
  if (Array.isArray(currentPokemon.types)) {
    currentPokemonTypesList = currentPokemon.types.map((type) => {

      return <li>{type.type.name}</li>;
    });
  }
 

//List to display Pokemon
let pokemonList = pokemon.map((pokemon) => (
      <li
        onClick={() => {
          handleClick(pokemon.url);
        }}
      >
        {pokemon.name}
      </li>
    )
    );

        //Handles the removing of favorited Pokemon
        function removePokemon() {
          let list = document.getElementById('favoritePokemon')
          list.innerText = ''
        }
        

  //Handles adding of favorites
  const button = <button onClick={() =>{addToFavorites(currentPokemon.name, currentPokemon.sprites.back_default, currentPokemon.stats[1].base_stat);}}>Add To Favorites</button>
  const removeButton = <button onClick={() =>{removePokemon();}}>Clear Favorites</button>


  let favoritePokemon = []
function addToFavorites(name, image, type) {
 let list = document.getElementById('favoritePokemon')
  favoritePokemon.push(name)

console.log(type)
  let newFav = document.createElement('li')
  newFav.textContent = name


  let newFavType = document.createElement('span')
  newFavType.textContent = type
  newFav.append(newFavType)

  let favImg = document.createElement('img')
  favImg.src = image
  favImg.style.cssTest = "width: 15px; height: auto;"
  newFav.append(favImg)


  // let removeFav = document.createElement('button')
  // removeFav.setAttribute('id', 'removeButton')
  // removeFav.onclick = removePokemon()
  // removeFav.innerText = 'Remove From Favorites'
  // newFav.append(removeFav)

  list.append(newFav)


}




//App
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <h4>Select a Pokemon to learn more!</h4>
      {/* <label>Filter:   </label>
      <select onChange={(val) => handlePeriodChange(val.target.value)}>
        <option selected>Select...</option>
        <option value="1">Normal</option>
        <option value="3" >Flying</option>
        <option value="4">Poision</option>
        <option value="10">Fire</option>
        <option value="11">Water</option>
        <option value="12">Grass</option>
        <option value="7">Bug</option>
    </select> */}

<div id="mC">
      <ul class="bigList"> {pokemonList}{sortedPokemonList} </ul>
      </div>
      <div id="card">
      <h2 class="currentPokemon">{currentPokemon.name}</h2>
      <figure>
      <img class="pokeImage" src={(`${currentImage}`)}/>
      </figure>
      <ul class="statsList">Stats:
        <li>Weight: {currentPokemon.weight}lbs</li>
        <li>Height: {currentPokemon.height} feet?</li>
      </ul>
      <span id="types">{currentPokemonTypesList}</span>
      <div id="buttonFav">{button}</div>
      </div>

      <div id="favList">
        <span id="favLabel">Favorite Pokemon:</span>
        <div id="labels">
        <span>Name:</span><span>Base Stat:</span><span>Image:</span>
        </div>
        <ul id="favoritePokemon">
        </ul>
        {removeButton}
      </div>
    </div>
  );
}
