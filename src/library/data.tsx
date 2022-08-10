import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function fetchPokemonById(id) {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    fetcher
  );

  return {
    pokemon: data,
    isLoading: !error && !data,
    isError: error,
  };
}
