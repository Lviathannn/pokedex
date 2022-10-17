function filterPokemon(data) {
   const pokemons = document.getElementsByClassName("card");
   const input = data.toLowerCase();
   console.log(input);
   for (const pokemon of pokemons) {
      pokemon.classList.remove("hidden");
      if (input == "") {
         pokemon.classList.remove("hidden");
      } else if (!pokemon.textContent.includes(input)) {
         pokemon.classList.add("hidden");
      }
   }
}

async function fetchPokemon() {
   const total = 100;
   for (let i = 1; i < total; i++) {
      await getPokemon(i);
   }
}
async function getPokemon(id) {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   await fetch(url)
      .then((response) => response.json())
      .then((data) => generatePokemon(data));
}

function generatePokemon(data) {
   const cardContainer = document.getElementById("card-container");
   const pokeName = data.name;
   const pokeID = data.id;
   const pokeType = data.types;
   const pokeImg =
      data.sprites.versions["generation-v"]["black-white"].animated
         .front_default;
   const card = makePokemon(pokeID, pokeName, pokeImg);
   cardContainer.innerHTML += card;
   makeType(pokeType, pokeID);
   const types = document.querySelectorAll(`.type${pokeID}`);
   types.forEach((type) => {
      styleType(type);
   });
}

function styleType(type) {
   type.innerHTML == "water"
      ? type.classList.add("bg-blue-400")
      : type.innerHTML == "fire"
      ? type.classList.add("bg-red-500")
      : type.innerHTML == "grass"
      ? type.classList.add("bg-green-400")
      : type.innerHTML == "ground"
      ? type.classList.add("bg-stone-500")
      : type.innerHTML == "bug"
      ? type.classList.add("bg-green-600")
      : type.innerHTML == "normal"
      ? type.classList.add("bg-slate-400")
      : type.innerHTML == "dragon"
      ? type.classList.add("bg-indigo-600")
      : type.innerHTML == "electric"
      ? type.classList.add("bg-yellow-500")
      : type.innerHTML == "fairy"
      ? type.classList.add("bg-pink-500")
      : type.innerHTML == "fighting"
      ? type.classList.add("bg-violet-700")
      : type.innerHTML == "flying"
      ? type.classList.add("bg-stone-500")
      : type.innerHTML == "ghost"
      ? type.classList.add("bg-slate-500")
      : type.innerHTML == "ice"
      ? type.classList.add("bg-cyan-200")
      : type.innerHTML == "poison"
      ? type.classList.add("bg-indigo-400")
      : type.innerHTML == "psychic"
      ? type.classList.add("bg-indigo-500")
      : type.innerHTML == "rock"
      ? type.classList.add("bg-stone-700")
      : type.classList.add("bg-slate-700");
}

function makeType(type, id) {
   const types = document.querySelector(`#type${id}`);
   type.forEach((element) => {
      const span = document.createElement("span");
      span.classList.add(
         "rounded-md",
         "text-white",
         "px-3",
         "py-[2px]",
         `type${id}`
      );
      span.innerHTML = element.type.name;
      types.appendChild(span);
   });
}
function makePokemon(id, name, img) {
   return `<div
      class="w-[80%] sm:w-[30%] h-[200px] md:h-[250px] bg-white rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.05)]  flex flex-col items-center pb-10 px-2 card card${id}"  
            >
            <img
            src=${img}
            alt=""
                  class="w-16 h-16 sm:w-20 sm:h-20 -mt-12 object-contain"
                  />
                  <h2 class="text-sm mt-14 md:mt-24 font-medium text-slate-500">No ${
                     id > 10 ? id : `0${id}`
                  }</h2>
                  <h1 class="text-lg font-semibold text-slate-700">${name}</h1>
                  <div class="flex gap-3 justify-center mt-5" id="type${id}">
                  
               </div>
               </div>`;
}

const searchForm = document.getElementById("input-form");
const inputType = document.getElementById("input-type");
const options = document.getElementsByClassName("option");
for (const option of options) {
   option.addEventListener("click", function () {
      const data = option.dataset.pokemon;
      filterPokemon(data);
   });
}

inputType.addEventListener("click", function () {
   const icon = document.getElementById("icon");
   icon.classList.toggle("-rotate-90");
   const dropdown = document.getElementById("dropdown");
   dropdown.classList.toggle("hidden");
});

searchForm.addEventListener("click", function (e) {
   e.preventDefault();
   const input = document.querySelector(".input").value;
   filterPokemon(input);
});

window.addEventListener("load", async function () {
   await fetchPokemon();
});
