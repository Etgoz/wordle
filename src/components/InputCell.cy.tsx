import React from 'react';
import { AppContext } from '../context/AppContext';
import { InputCell } from './InputCell';
import { IUseWordle } from '../hooks/useWordle';

describe('<InputCell /> tests', () => {
  it('should render an empty cell', () => {
    const testContext = { currentCell: { curRow: 0, curCell: 0 }, refMatrix: [[{ content: '', status: 'empty' }]] };
    cy.mount(
      <AppContext.Provider value={testContext as unknown as IUseWordle}>
        <InputCell rowNumber={0} cellNumber={0} />
      </AppContext.Provider>
    );
    cy.get('.input').should('contain', '');
    cy.get('.input.focused').should('exist');
    cy.get('.input.empty').should('exist');
  });

  it('should focus on the current cell', () => {
    const testContext = { currentCell: { curRow: 0, curCell: 0 }, refMatrix: [[{ content: '', status: 'empty' }]] };
    cy.mount(
      <AppContext.Provider value={testContext as unknown as IUseWordle}>
        <InputCell rowNumber={0} cellNumber={0} />
      </AppContext.Provider>
    );
    cy.get('.input').should('have.focus');
  });

  it('should render a cell with a bull class and letter', () => {
    const testContext = { currentCell: { curRow: 0, curCell: 0 }, refMatrix: [[{ content: 'פ', status: 'bull' }]] };
    cy.mount(
      <AppContext.Provider value={testContext as unknown as IUseWordle}>
        <InputCell rowNumber={0} cellNumber={0} />
      </AppContext.Provider>
    );
    cy.get('.input').should('contain', 'פ');
    cy.get('.input.focused').should('exist');
    cy.get('.input.bull').should('exist');
  });
});
