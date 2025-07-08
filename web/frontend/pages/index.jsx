import React from 'react';
import { AppProvider } from '@shopify/polaris';
import Table from '../components/Table';
import '@shopify/polaris/build/esm/styles.css';

export default function Index() {
  return (
    <AppProvider i18n={{}}>
      <Table />
    </AppProvider>
  );
}
