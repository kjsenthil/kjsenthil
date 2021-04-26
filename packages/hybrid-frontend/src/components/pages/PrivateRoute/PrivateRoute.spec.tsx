import React from 'react';
import { Router } from '@reach/router';
import { renderWithTheme } from '@tsw/test-util';
import PrivateRoute from './PrivateRoute';
import { handleLoginSession } from '../../../services/auth/auth';
import { sessionTokenValue } from '../../../constants';

describe('Private Route Components', () => {
  beforeEach(() => {});

  test('Navigate after login', () => {
    handleLoginSession(sessionTokenValue);
    renderWithTheme(
      <Router>
        <PrivateRoute path="/app/test" Component={<h1>My Acc Route Test Component</h1>} />
      </Router>
    );
  });
});
