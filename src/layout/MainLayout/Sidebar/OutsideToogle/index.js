import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconLayoutSidebarRightExpand } from '@tabler/icons';
import PropTypes from 'prop-types';

const OutsideToogle = ({ handleToggle, show }) => {
  const theme = useTheme();

  return (
    <>
      {show && (
        <Tooltip title="Abrir menu">
          <Fab
            component="div"
            onClick={handleToggle}
            size="medium"
            variant="circular"
            color="secondary"
            sx={{
              borderRadius: '100%',
              top: '2.5%',
              position: 'fixed',
              left: '1px',
              zIndex: theme.zIndex.speedDial
            }}
          >
            <IconLayoutSidebarRightExpand />
          </Fab>
        </Tooltip>
      )}
    </>
  );
};

OutsideToogle.propTypes = {
  handleToggle: PropTypes.func,
  show: PropTypes.bool
};

export default OutsideToogle;
