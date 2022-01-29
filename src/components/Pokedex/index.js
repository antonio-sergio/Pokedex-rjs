import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CardContent, Typography } from '@mui/material';
import api from '../../services/api';

function Pokedex() {
  const [pokemons, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const nextPage = (value) => {
    if (value !== 1) {
      return value * 10 - 10;
    }
    return 0;
  };
  useEffect(() => {
    async function getItems() {
      const { data } = await api.get(`/pokemon?limit=10&offset=${nextPage(page)}`);
      const resp = await Promise.all(data.results.map((item) => api.get(item.url)));
      const format = resp.map((req) => req.data);
      setPokemon(format);
    }

    getItems();
  }, [page]);
  return (
    <div className="App">

      {
            pokemons.map((pokemon) => (
              <div>

                <h3> {pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase()} </h3>

                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.types.map((ability) => (
                  <p key={`${pokemon.id}a${ability.type.name}`}>{ability.type.name}</p>))}
              </div>

            ))
        }

      <Stack spacing={2}>
        <Pagination
          count={112}
          showFirstButton
          showLastButton
          color="primary"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default Pokedex;
