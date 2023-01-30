import React from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';
import { KeyboardRow } from './KeyboardRow';

function checkUserGuess() {
  return;
}

function setRefMatrix() {
  return;
}

function nextCell() {
  return;
}

function setActiveGame() {
  return;
}

function setTheWord() {
  return;
}

describe('<KeyboardRow />', () => {
  it('renders with correct number of letters', () => {
    const testContext = {
      guessedLetters: { bull: [], cow: [], wrong: [] },
      activeGame: true,
      checkUserGuess,
      currentCell: { curRow: 0, curCell: 0 },
      refMatrix: [
        [
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
        ],
      ],
      setRefMatrix,
      nextCell,
      winIndicator: false,
      setActiveGame,
      setTheWord,
    };
    cy.mount(
      <AppContext.Provider value={testContext as unknown as IUseWordle}>
        <KeyboardRow letters={['א', 'ב', 'ג']} />
      </AppContext.Provider>
    );
    cy.get('.keyboard').find('button').should('have.length', 3);
  });

  it('א should have className bull, ב should have className cow, ג should have className wrong', () => {
    const testContext = {
      guessedLetters: { bull: ['א'], cow: ['ב'], wrong: ['ג'] },
      activeGame: true,
      checkUserGuess,
      currentCell: { curRow: 0, curCell: 0 },
      refMatrix: [
        [
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
          { content: '', status: 'empty' },
        ],
      ],
      setRefMatrix,
      nextCell,
      winIndicator: false,
      setActiveGame,
      setTheWord,
    };
    cy.mount(
      <AppContext.Provider value={testContext as unknown as IUseWordle}>
        <KeyboardRow letters={['א', 'ב', 'ג']} />
      </AppContext.Provider>
    );
    cy.get('button').contains('א').should('have.class', 'bull');
    cy.get('button').contains('ב').should('have.class', 'cow');
    cy.get('button').contains('ג').should('have.class', 'wrong');
  });
});
