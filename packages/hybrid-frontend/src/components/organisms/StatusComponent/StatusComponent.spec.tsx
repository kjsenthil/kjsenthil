import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import StatusComponent from './StatusComponent';

describe('StatusComponent', () => {
  test('Renders a StatusComponent', () => {
    const entityId = 'Test entityId';
    const goalStatusMessage = 'Test goalStatusMessage';
    const objStatusMessage = 'Test objStatusMessage';
    const linkStatusMessage = 'Test linkStatusMessage';
    renderWithTheme(
      <StatusComponent
        entityId={entityId}
        goalStatusMessage={goalStatusMessage}
        objStatusMessage={objStatusMessage}
        linkStatusMessage={linkStatusMessage}
      />
    );
    expect(screen.getByText(`Entity ID:${entityId}`)).toBeInTheDocument();
    expect(screen.getByText(`Goal Status:${goalStatusMessage}`)).toBeInTheDocument();
    expect(screen.getByText(`Objective Status:${objStatusMessage}`)).toBeInTheDocument();
    expect(screen.getByText(`Final Link Status:${linkStatusMessage}`)).toBeInTheDocument();
  });
});
