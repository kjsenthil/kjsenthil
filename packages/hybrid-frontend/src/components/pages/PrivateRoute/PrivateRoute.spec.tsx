import React from 'react';
import { Router } from '@reach/router';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { handleLoginSession } from '../../../services/auth';

describe('Private Route Components', () => {
  beforeEach(() => {});

  test('Navigate after login', () => {
    handleLoginSession('HYBRID-LOGIN-SESSION');

    render(
      <Router>
        <PrivateRoute path="/app/test" Component={<h1>Route Test Component</h1>} />
      </Router>
    );
  });
});
