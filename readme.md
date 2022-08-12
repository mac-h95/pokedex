# Pokédex

A simple Pokédex built using the Pokémon API.

[Website](https://pokedex-mac.vercel.app)

## User Stories

- Lists all current Pokémon.
- Filterable by generation.
- Stats for each Pokémon are listed.
- Comparisons allowing the user to compare two Pokémon's stats.
- Ability to favourite various Pokémon so you can view their stats quicker without searching through.

## Getting Started

1. Download Repository as a `.zip` or run `git clone https://github.com/mac-h95/pokedex`.
2. Change into the repositories directory and run `npm i` or `yarn`.
3. Run the application using `npm run start` or `yarn start`.

## Libraries

- I utlised SWR for fetching data, this would allow me to grow the application smoother if I were to add more user interface changes.
- Feather Icons is a convenient library for React icons taken from [feather](https://feathericons.com).
- I used a chart rendering library to display comparisons of stats for various Pokémon.

## Challenges

- I didn't realise the main api url that lists Pokémon would only contain the url, name and id initially so had to figure out a solution for also fetching the Pokémon's stats and sprite.

- I noticed towards the end of building the app that the `/generations` endpoint contained a `species` key which contained all of the Pokémon for that generation, had I noticed earlier I would not have hard-coded the generation names, this would be an update I would make if this was a long term project. That way instead of having to manually add, I could run a `map()` function along the generations which then fetched the Pokémon for that generation. In order to keep within the 4 days set by the challenge I will not add this on here.
