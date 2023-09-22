import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const ImageModal = ({ imageLink }) => {
  return (
    <Box sx={{ width: '150px', height: '150px', display: 'flex', justifyContent: 'center' }}>
      <a target="_blank" rel="noopener noreferrer" href={imageLink}>
        <img alt="imagen de producto" style={{ maxWidth: '150px' }} src={imageLink} />
      </a>
    </Box>
  );
};

ImageModal.propTypes = {
  imageLink: PropTypes.string
};

export default ImageModal;
