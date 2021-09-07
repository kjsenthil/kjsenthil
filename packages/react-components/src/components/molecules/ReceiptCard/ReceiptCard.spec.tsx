import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ReceiptCard from '.';

describe('ReceiptCard', () => {
  test('Renders it successfully', () => {
    renderWithTheme(
      <ReceiptCard
        items={[
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
        ]}
        total={{ key: 'Total', value: '£1,200' }}
        listHeader={{ key: 'Details', value: 'Summary' }}
      />
    );
    expect(screen.getByText('DETAILS')).toBeInTheDocument();
    expect(screen.getByText('SUMMARY')).toBeInTheDocument();
    expect(screen.getByText('key1')).toBeInTheDocument();
    expect(screen.getByText('value1')).toBeInTheDocument();
    expect(screen.getByText('key2')).toBeInTheDocument();
    expect(screen.getByText('value2')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('£1,200')).toBeInTheDocument();
  });
});
