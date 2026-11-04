// Async / Await: Pokemon API
// Picks a random Pokemon from the original 151 and logs its info.
// Run with: node pokemon.js

// 1. Making multiple API calls with async / await
// 2. Pulling data out of the responses and putting it together

// async lets the function use await.
// await waits for the fetch to finish before going to the next line.

async function getPokemonData(id) {
  // Step 1: get the Pokemon by its ID.
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // Error handling
  // check response.ok and throw an error
  if (!pokemonResponse.ok) {
    throw new Error(`Pokemon request failed with status ${pokemonResponse.status}`);
  }
  const pokemon = await pokemonResponse.json();

  // Step 2: the first response has a link to the species data, use it to get more info.
  const speciesResponse = await fetch(pokemon.species.url);
  if (!speciesResponse.ok) {
    throw new Error(`Species request failed with status ${speciesResponse.status}`);
  }
  const species = await speciesResponse.json();

  // There's flavor text for every game in every language, grab the first English one.
  const englishEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  );

  // Step 3: put the data from both calls into one object.
  return {
    // From the pokemon call
    name: pokemon.name,
    height: pokemon.height, 
    weight: pokemon.weight, 
    types: pokemon.types.map((slot) => slot.type.name), // ex: 'grass'


    flavorText: englishEntry.flavor_text.replace(/\s+/g, ' '),
    habitat: species.habitat.name,
    isLegendary: species.is_legendary,
  };
}


// 3. Error handling
// 4. Showing the data in a readable way

async function assignmentTask() {
  // Random number from 1 to 151.
  // Math.random() * 151 gives 0 to 150.99, Math.floor rounds down to 0-150, and + 1 makes it 1-151.
  const id = Math.floor(Math.random() * 151) + 1;

  // try / catch: if anything in getPokemonData fails, it jumps to catch
  // and logs the error instead of crashing.
  try {
    const pokemonData = await getPokemonData(id);
    console.log(`Pokemon #${id}:`);
    console.log(pokemonData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

assignmentTask();
