import { useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import PlaneationTable from './PlaneationTable';
// mui imports
import { Box, Typography, Stack, Autocomplete, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import { httpUploadCsv } from 'hooks/request';
// utils
import { excelSerialDateToJSDate } from 'utils/excelSerialDateToJSDate';
import { procesarData } from 'utils/processDataArray';

const Planeacion = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  const [cubiculo, setCubiculo] = useState('');

  console.log(cubiculo);

  const handleFileChange = (e) => {
    httpUploadCsv(e.target.files[0]).then((response) => {
      setTableData(procesarData(response));
    });
  };

  const columns = [
    { field: 'Fecha', headerName: 'Fecha y hora', width: 300 },
    { field: 'Duracion', headerName: 'Duracion', width: 150 },
    { field: 'Paciente', headerName: 'Paciente', width: 250 },
    { field: 'Cubículo', headerName: 'Cubículo' }
  ];

  const rows = tableData.map((Item, i) => ({
    id: i,
    Fecha: excelSerialDateToJSDate(Item['Fecha y hora']),
    Duracion: Item?.Duración,
    Paciente: Item?.Paciente,
    Cubículo: Item?.Cubículo,
    Descripcion: Item?.Descripción
  }));

  const FirstStep = () => {
    const numCubiculos = [{ label: '1' }, { label: '2' }, { label: '3' }];
    return (
      <Box>
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%', height: '90vh' }}>
          <Typography sx={{ textAlign: 'center', fontSize: '28px' }}>Primero selecciona el número de cubículo </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={cubiculo}
            options={numCubiculos}
            onChange={(e) => setCubiculo(e.target.outerText)}
            sx={{ width: 100 }}
            renderInput={(params) => <TextField {...params} label="número" />}
          />
        </Stack>
      </Box>
    );
  };

  return (
    <>
      {!cubiculo && <FirstStep />}
      {tableData.length === 0 && cubiculo ? (
        <Box>
          <MainCard
            sx={{
              position: 'relative',
              height: '80vh',
              border: '4px solid',
              borderColor: `${theme.palette.secondary.main}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ textAlign: 'center', fontSize: '28px' }}>Cubículo {cubiculo}</Typography>

            <input
              onChange={handleFileChange}
              type="file"
              accept=".csv"
              style={{ width: '100%', height: '80vh', position: 'absolute', top: 0, left: 0, opacity: 0 }}
            />
            <Typography sx={{ textAlign: 'center', fontSize: '28px' }}>Arrastra tu archivo de excel aquí</Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '28px' }}>Tambien puedes dar click y subir el archivo</Typography>
          </MainCard>
        </Box>
      ) : (
        tableData.length !== 0 && <PlaneationTable cubiculo={cubiculo} columns={columns} rows={rows} />
      )}
    </>
  );
};
export default Planeacion;
