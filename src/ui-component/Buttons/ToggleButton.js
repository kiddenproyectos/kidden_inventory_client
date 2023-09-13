import PropTypes from 'prop-types';
import React from 'react';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons';

const ToggleButton = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <Avatar
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: 'transparent',
        color: theme.palette.primary.main
      }}
      onClick={handleLeftDrawerToggle}
      color="inherit"
    >
      <IconLayoutSidebarLeftCollapse stroke={1.5} size="2rem" />
    </Avatar>
  );
};

ToggleButton.propTypes = {
  handleLeftDrawerToggle: PropTypes.func.isRequired
};

export default ToggleButton;
