const form = document.querySelector("form");
const inputNom = document.getElementById("inputNom");
const pokemonCard = document.querySelector(".pokemonCard");
let numero = 0;
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const fetchPokemon = async (next) => {
  next ? numero++ : numero !== 1 ? numero-- : null;
  const url = "https://pokeapi.co/api/v2/pokemon/" + numero;
  const result = await fetch(url);
  const data = await result.json();
  const type = data.types[0].type.name;
  let backgroundClass = "";

  // Second fetch
  const url2 = "https://pokeapi.co/api/v2/pokemon-species/" + numero;
  const result2 = await fetch(url2);
  const data2 = await result2.json();
  const description = data2.flavor_text_entries[0].flavor_text;
  switch (type) {
    case "grass":
      backgroundClass = "green";
      break;
    case "fire":
      backgroundClass = "fire";
      break;
    case "water":
      backgroundClass = "water";
      break;
    case "bug":
      backgroundClass = "bug";
      break;

    default:
      break;
  }
  const bgColor =
    type === "grass"
      ? "green"
      : type === "fire"
      ? "fire"
      : type === "water"
      ? "water"
      : type === "bug"
      ? "bug"
      : "";
  {
    /* <div class="card ${bgColor}">
  
  <div class="information">
    <span class="numero"> #${data.id}</span>
    <span class="nom"></span>
  </div>
</div>; */
  }
  pokemonCard.innerHTML = `
          <div class="nametype">
          <span>#${data.id} ${data.name}</span><span> ${type}</span></div>
          <div class="description">${description}</div>
         
    <img class="sprites" src="${data.sprites.other.dream_world.front_default}" alt="image de ${data.name}" />
        `;
};
fetchPokemon(true);

nextButton.addEventListener("click", () => {
  fetchPokemon(true);
});
previousButton.addEventListener("click", () => {
  fetchPokemon(false);
});
let keyPress = false;
window.addEventListener("keydown", (e) => {
  // wait 1 second before allowing another keypress

  if (keyPress) return;
  else {
    keyPress = true;
    setTimeout(() => {
      keyPress = false;
    }, 500);
    if (e.key === "ArrowRight") {
      fetchPokemon(true);
    } else if (e.key === "ArrowLeft") {
      fetchPokemon(false);
    } else if (e.key === "Enter") {
      fetchPokemon(true);
    } else if (e.key === "Backspace") {
      fetchPokemon(false);
    } else if (e.key === "ArrowUp") {
      fetchPokemon(true);
    } else if (e.key === "ArrowDown") {
      fetchPokemon(false);
    }
  }
});
