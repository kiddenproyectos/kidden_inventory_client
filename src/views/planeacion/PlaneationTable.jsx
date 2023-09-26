import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Stack, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
/* eslint-disable */

const TableColumn = ({ columnTitle, key, color }) => {
  return (
    <div key={key}>
      <Box sx={{ background: color, border: '1px solid black' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', padding: '8px' }}>{columnTitle}</Typography>
      </Box>
    </div>
  );
};
const TableRow = ({ rowText, key, special, editable }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [editableField, setEditableField] = useState(rowText);
  const [showEditableField, setShowEditableField] = useState(false);
  // Verifica si rowText comienza con las primeras tres letras "NaN"
  if (typeof rowText === 'string' && rowText.startsWith('NaN')) {
    return null; // No muestra nada si comienza con "NaN"
  }

  // Divide el texto en líneas utilizando "\n" como separador
  const lines = rowText?.split('\n');

  const onEnterEditablefield = (event) => {
    if (event.key === 'Enter') {
      setShowEditableField(false);
    }
  };
  return editable ? (
    <div key={key} onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
      {rowText && (
        <Box sx={{ border: '1px solid black', minHeight: '40px' }}>
          {/* Mapea cada línea y renderízala en un elemento Typography */}
          {lines.map((line, index) => (
            <Stack
              direction="row"
              onClick={() => setShowEditableField(true)}
              justifyContent="space-between"
              alignContent="center"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
            >
              {showEditableField ? (
                <TextField
                  onChange={(e) => setEditableField(e.target.value)}
                  onKeyDown={(e) => onEnterEditablefield(e)}
                  variant="standard"
                  label="Editar"
                  required
                  sx={{ marginLeft: '8px', width: '100%' }}
                />
              ) : (
                <>
                  <Typography
                    key={index}
                    sx={{ fontSize: `${special ? '16px' : '14px'}`, padding: '8px', fontWeight: `${special && '700'}` }}
                  >
                    {editableField}
                  </Typography>
                  {showIcon && <ModeEditIcon />}
                </>
              )}
            </Stack>
          ))}
        </Box>
      )}
    </div>
  ) : (
    <div key={key}>
      {rowText && (
        <Box sx={{ border: '1px solid black', minHeight: '40px' }}>
          {/* Mapea cada línea y renderízala en un elemento Typography */}
          {lines.map((line, index) => (
            <Typography key={index} sx={{ fontSize: `${special ? '16px' : '14px'}`, padding: '8px', fontWeight: `${special && '700'}` }}>
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
  const colorDeCubiculo = {
    1: 'yellow',
    2: 'Chartreuse',
    3: 'cyan',
    4: 'pink',
    5: 'MediumPurple'
  };
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
              <TableColumn columnTitle={`Cubiculo ${cubiculo}`} color={`${colorDeCubiculo[cubiculo]}`} />
            </Grid>
            {columns.map((item) => (
              <Grid key={item?.headerName} item xs={item.width}>
                <TableColumn columnTitle={item?.headerName} key={item?.headerName} color={`${colorDeCubiculo[cubiculo]}`} />
              </Grid>
            ))}
            {rows.map((item, i) => (
              <>
                <Grid key={i} item xs={2}>
                  <TableRow rowText={item.Fecha} special />
                </Grid>
                <Grid key={i + 1} item xs={2}>
                  <TableRow rowText={item?.Duracion} />
                </Grid>
                <Grid key={i + 2} item xs={6}>
                  <TableRow rowText={item?.Paciente} editable special />
                </Grid>
                <Grid key={i + 3} item xs={2}>
                  <TableRow rowText={item?.Cubículo} editable />
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
