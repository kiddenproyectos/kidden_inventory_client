import React from 'react';
import { Avatar, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons';

const ToggleButton = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: 'all .2s ease-in-out',
          background: 'transparent',
          color: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.secondary.light
          }
        }}
        onClick={handleLeftDrawerToggle}
        color="inherit"
      >
        <IconLayoutSidebarLeftCollapse stroke={1.5} size="2rem" />
      </Avatar>
    </ButtonBase>
  );
};

export default ToggleButton;
