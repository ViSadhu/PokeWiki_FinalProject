const API_URL = 'http://localhost:3001/generation';

export async function fetchGenerations() {
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