import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher = (url: string) => fetch(url).then((res) => res.json());

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
