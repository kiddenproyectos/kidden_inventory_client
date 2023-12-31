import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

const MainTable = ({ rows, columns, inventario, print }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  /* eslint-disable */
  const [tableRows, setTableRows] = useState(rows);
  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  return (
    <div style={{ maxHeight: `${!print && '80vh'}`, overflow: 'scroll' }}>
      <DataGrid
        checkboxSelection
        rows={tableRows}
        columns={columns}
        rowHeight={inventario && 200}
        pagination={false} // Desactivar la paginación
        onRowSelectionModelChange={(data) => dispatch({ type: 'SET_IDS_ROWS', id_rows_array: data })}
        sx={{
          boxShadow: 2,
          border: 2,
          background: 'white',
          borderColor: 'primary.light',

          '& .MuiDataGrid-columnHeaders': {
            position: `${print ? 'relative' : 'fixed'}`,
            zIndex: 1000,
            backgroundColor: 'white'
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: `${print ? '0px' : '80px'}`
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent'
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: theme.palette.secondary.light
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: theme.palette.secondary.light
          },
          '& .css-1p5pb03-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
            color: theme.palette.secondary.main
          }
        }}
      />
    </div>
  );
};

MainTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  inventario: PropTypes.bool,
  print: PropTypes.bool
};

export default MainTable;
