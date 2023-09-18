import React from 'react';
import { Grid, Box, Typography, Button, Stack } from '@mui/material';
/* eslint-disable */

const TableColumn = ({ columnTitle, key }) => {
  return (
    <div key={key}>
      <Box sx={{ background: 'yellow', border: '1px solid black' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', padding: '8px' }}>{columnTitle}</Typography>
      </Box>
    </div>
  );
};
const TableRow = ({ rowText, key }) => {
  // Verifica si rowText comienza con las primeras tres letras "NaN"
  if (typeof rowText === 'string' && rowText.startsWith('NaN')) {
    return null; // No muestra nada si comienza con "NaN"
  }

  // Divide el texto en líneas utilizando "\n" como separador
  const lines = rowText?.split('\n');

  return (
    <div key={key}>
      {rowText && (
        <Box sx={{ border: '1px solid black', minHeight: '40px' }}>
          {/* Mapea cada línea y renderízala en un elemento Typography */}
          {lines.map((line, index) => (
            <Typography key={index} sx={{ fontSize: '14px', padding: '8px' }}>
              {line}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

function printdiv(elem) {
  var header_str = '<html><head><title>' + document.title + '</title></head><body>';
  var footer_str = '</body></html>';
  var new_str = document.getElementById(elem)?.innerHTML;
  var old_str = document.body.innerHTML;
  document.body.innerHTML = header_str + new_str + footer_str;
  window.print();
  document.body.innerHTML = old_str;
  return false;
}
const PlaneationTable = ({ columns, rows, cubiculo }) => {
  // Función para manejar la impresión

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={() => printdiv('printable_div_id')}>
          Imprimir
        </Button>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Otro cubículo
        </Button>
      </Stack>
      <div id="printable_div_id">
        <Box sx={{ flexGrow: 1, background: 'white', marginBottom: '8px', marginTop: '16px' }}>
          <Grid container>
            <Grid item xs={12}>
              <TableColumn columnTitle={`Cubiculo ${cubiculo}`} />
            </Grid>
            {columns.map((item) => (
              <Grid key={item?.headerName} item xs={3}>
                <TableColumn columnTitle={item?.headerName} key={item?.headerName} />
              </Grid>
            ))}
            {rows.map((item, i) => (
              <>
                <Grid key={i} item xs={3}>
                  <TableRow rowText={item.Fecha} />
                </Grid>
                <Grid key={i + 1} item xs={3}>
                  <TableRow rowText={item?.Duracion} />
                </Grid>
                <Grid key={i + 2} item xs={3}>
                  <TableRow rowText={item?.Paciente} />
                </Grid>
                <Grid key={i + 3} item xs={3}>
                  <TableRow rowText={item?.Cubículo} />
                </Grid>
                <Grid key={i + 4} item xs={12}>
                  <TableRow rowText={item?.Descripcion} />
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default PlaneationTable;
