const API_URL = 'http://localhost:3001/pokemon';

export async function fetchPokemons() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon data');
  }
  return response.json();
}

export async function addPokemon(pokemon) {
  console.log(JSON.stringify(pokemon));
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pokemon),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Failed to submit: ${response.statusText}`);
  }
  return response.json();
}

export async function deletePokemon(id) {
    const response = await fetch(`http://localhost:3001/pokemon/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Pokémon');
    }
    return response.json();
  }