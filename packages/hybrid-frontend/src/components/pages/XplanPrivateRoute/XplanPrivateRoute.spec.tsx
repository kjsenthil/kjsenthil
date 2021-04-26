import React from 'react';
import { Router } from '@reach/router';
import { renderWithTheme } from '@tsw/test-util';
import XplanPrivateRoute from './XplanPrivateRoute';
import { xplanSessionTokenValue } from '../../../constants';
import { handleXplanLoginSession } from '../../../services/xplanAuth/xplanAuth';

describe('Private Route Components', () => {
  beforeEach(() => {});

  test('Navigate after xplan login', () => {
    handleXplanLoginSession(xplanSessionTokenValue);

    renderWithTheme(
      <Router>
        <XplanPrivateRoute path="/xapp/xtest" Component={<h1>Xplan Route Test Component</h1>} />
      </Router>
    );
  });
});
