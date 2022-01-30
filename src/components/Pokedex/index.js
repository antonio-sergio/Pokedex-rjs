import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import api from '../../services/api';

function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        p: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  // eslint-disable-next-line react/require-default-props
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Gap() {
  const [pokemons, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const nextPage = (value) => {
    if (value !== 1) {
      return value * 10 - 8;
    }
    return 0;
  };
  useEffect(() => {
    async function getItems() {
      const { data } = await api.get(`/pokemon?limit=8&offset=${nextPage(page)}`);
      const resp = await Promise.all(data.results.map((item) => api.get(item.url)));
      const format = resp.map((req) => req.data);
      setPokemon(format);
    }

    getItems();
  }, [page]);
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {
            pokemons.map((pokemon) => (
              <Item key={pokemon.id}>

                <h3 key={`${pokemon.id}h3`}> {pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase()} </h3>

                <img key={pokemon.id} src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.types.map((ability) => (
                  <p key={`${pokemon.id}a${ability.type.name}`}>{ability.type.name}</p>))}
              </Item>

            ))
        }

      </Box>

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
