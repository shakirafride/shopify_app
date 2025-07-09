import React from 'react';
import { AppProvider } from '@shopify/polaris';

import '@shopify/polaris/build/esm/styles.css';
import Model from '../components/Model';
import ProductTable from '../components/ProductTable';

export default function Index() {
  return (
    <AppProvider i18n={{}}>
      <Model/>
      <ProductTable/>
    </AppProvider>
  );
}
