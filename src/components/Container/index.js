import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pokedex from '../Pokedex';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ width: '50%' }}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '75vh' }}>

          <Pokedex />
        </Box>
      </Container>
    </>
  );
}
