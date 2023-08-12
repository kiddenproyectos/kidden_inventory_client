import React from 'react';
import { Avatar, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import { IconMenu2 } from '@tabler/icons';

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
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
          }
        }}
        onClick={handleLeftDrawerToggle}
        color="inherit"
      >
        <IconMenu2 stroke={1.5} size="1.3rem" />
      </Avatar>
    </ButtonBase>
  );
};

export default ToggleButton;
