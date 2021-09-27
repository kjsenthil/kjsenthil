import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Carousel from './Carousel';
import { Card, Typography } from '../../atoms';

describe('Carousel', () => {
  test('Renders Carousel case', () => {
    renderWithTheme(
      <Carousel settings={{ infinite: false }}>
        <div>
          <Card>
            <Typography variant="h1">Test Content 1</Typography>
          </Card>
        </div>
        <div>
          <Card>
            <Typography variant="h1">Test Content 2</Typography>
          </Card>
        </div>
      </Carousel>
    );

    expect(screen.getByText('Test Content 1')).toBeInTheDocument();
  });
});
