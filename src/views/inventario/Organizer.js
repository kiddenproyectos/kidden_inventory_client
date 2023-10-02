import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Grid, Button } from '@mui/material';
import { calcularMesesRestantes } from 'views/utilities/OrganizerDate';

const Organizer = () => {
  const [meses, setMeses] = useState([]);
  const navigate = useNavigate(); // Obtiene la función de navegación

  useEffect(() => {
    setMeses(calcularMesesRestantes());
  }, []);

  const handleMesButtonClick = (mes) => {
    const year = 2023; // Año fijo, puedes cambiarlo según tus necesidades
    navigate(`/inventario/${year}/${mes}`); // Navega a la nueva ruta
  };

  console.log(meses);
  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Typography variant="h1">2023</Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" my={3}>
        <Typography variant="h3">Selecciona un mes</Typography>
      </Stack>
      <Grid container spacing={2}>
        {meses.map((item) => (
          <Grid key={item.mes} item xs={4}>
            <Stack direction="row" justifyContent="center">
              <Button
                onClick={() => handleMesButtonClick(item.mes)}
                disabled={!item.activo}
                sx={{ width: '300px', height: '200px', fontSize: '32px' }}
                variant="contained"
              >
                {item.mes}
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Organizer;
