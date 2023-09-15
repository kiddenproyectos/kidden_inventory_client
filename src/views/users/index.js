import { useState } from 'react';

// mui imports
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import MainTable from 'ui-component/tables/MainTable';
import AddUserModal from './AddUserModal';

// hooks
import useUsers from 'hooks/useUsers';

const Users = () => {
  const [{ users }] = useUsers();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre de usuario', width: 200 },
    { field: 'rol', headerName: 'Rol', width: 100 },
    { field: 'password', headerName: 'contraseña', width: 150 }
  ];

  const [modal, setModal] = useState(false);

  const rows = users.map((items) => ({
    id: items?.id?.S,
    nombre: items?.nombre?.S,
    rol: items?.rol?.S,
    password: items?.password?.S
  }));

  const onClickAddUserButton = () => {
    setModal(true);
  };

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="flex-end" mb={4}>
        <Button onClick={onClickAddUserButton} startIcon={<PersonAddIcon />} variant="contained">
          Agregar Usuario
        </Button>
      </Stack>
      <MainCard title="Lista de usuarios">
        <MainTable rows={rows} columns={columns} />
      </MainCard>
      <AddUserModal showModal={modal} closeModal={() => setModal(false)} />
    </>
  );
};

export default Users;
