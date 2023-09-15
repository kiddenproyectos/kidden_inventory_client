// mui imports
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: 3
};

const closeIconButtonStyle = {
  position: 'absolute',
  top: '-12px',
  right: '-14px'
};

const ModalUI = ({ title, handleCloseModal, closeModal, children }) => {
  const theme = useTheme();

  return (
    <Paper sx={style} elevation={3}>
      <IconButton onClick={handleCloseModal} size="small" sx={closeIconButtonStyle}>
        <CancelIcon color="error" fontSize="large" onClick={closeModal} />
      </IconButton>
      <Typography variant="h2" color={theme.palette.secondary['800']}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

ModalUI.propTypes = {
  handleCloseModal: PropTypes.any,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

export default ModalUI;
