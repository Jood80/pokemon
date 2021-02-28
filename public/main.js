const container = document.getElementById('fire');
const searchInput = document.querySelector('#search_input');
const form = document.getElementById('form');

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

const createCard = (pokemon) => {
  container.innerHTML = '';
  pokemon.map((pok) => {
    const mainContainer = document.createElement('div');
    const content = document.createElement('div');
    const nameContainer = document.createElement('div');

    const name = document.createTextNode(pok.name);

    const image = document.createElement('img');
    image.src = `https://raw.githubusercontent.com/Jood80/pokemon.json/master/images/${pok.image}?raw=true`;
    image.width = '200';
    image.height = '200';

    content.appendChild(image);
    nameContainer.appendChild(name);
    content.appendChild(nameContainer);
    mainContainer.appendChild(content);
    container.appendChild(mainContainer);

    content.classList.add('card', 'darken-3', 'z-depth-3');
    image.classList.add('card-image');
    nameContainer.classList.add(
      'card-content',
      'modal-trigger',
      'center-align',
    );
    nameContainer.setAttribute('data-target', 'popUp');
    mainContainer.classList.add('col', 's12', 'm6', 'l3');
  });
};

const getPokemon = async () => {
  try {
    const res = await fetch(
      'https://pokemon-jade-two.vercel.app/api/pokemons',
    );
    const pokemons = await res.json();

    if (pokemons) {
      pokemons.sort((x, y) => x.name.localeCompare(y.name));
      createCard(pokemons);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchedPokemon = searchInput.value.toLowerCase();

      const res = await fetch(`/api/pokemons/${searchedPokemon}`);

      const pokemons = await res.json();

      createCard(pokemons);
    });
  } catch (error) {
    // TODO: handing the error properly
    throw new Error(error);
  }
};

getPokemon();
