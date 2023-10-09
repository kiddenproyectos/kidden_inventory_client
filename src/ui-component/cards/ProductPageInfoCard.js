import React from 'react';

import SubCard from './SubCard';

const ProductPageInfoCard = ({ entradas, salidas }) => {
  return (
    <SubCard sx={{ width: '35%', marginLeft: '20px', height: '90vh' }} title="Información ">
      <p style={{ fontSize: '18px', fontWeight: '500' }}>Total Entradas agregadas:</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>{entradas}</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>Total Salidas Restadas:</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>{salidas}</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>Total Utilizado:</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>{entradas - salidas}</p>
    </SubCard>
  );
};

export default ProductPageInfoCard;
