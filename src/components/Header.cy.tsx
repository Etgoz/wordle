import React from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { IUseAuth } from '../hooks/useAuth';
import { IUseWordle } from '../hooks/useWordle';
import { Header } from './Header';

describe('Header without user', () => {
  const testAuthContext = { userName: null, setUserName: (name: any) => {} };
  const testAppContext = { toggleHelpVisability: () => {}, toggleLoginVisability: () => {} };
  it('renders', () => {
    cy.mount(
      <AuthContext.Provider value={testAuthContext as unknown as IUseAuth}>
        <AppContext.Provider value={testAppContext as unknown as IUseWordle}>
          <Header />
        </AppContext.Provider>
      </AuthContext.Provider>
    );
  });
  it('should say שלום אורח/ת! and display log in button', () => {
    cy.mount(
      <AuthContext.Provider value={testAuthContext as unknown as IUseAuth}>
        <AppContext.Provider value={testAppContext as unknown as IUseWordle}>
          <Header />
        </AppContext.Provider>
      </AuthContext.Provider>
    );
    cy.get('.userArea').should('exist');
    cy.get('.userArea').get('button').should('contain', 'log in');
    cy.get('.userArea').should('contain', 'שלום אורח/ת!');
  });
});

describe('Header with user', () => {
  const testAuthContext = { userName: 'איתי', setUserName: (name: any) => {} };
  const testAppContext = { toggleHelpVisability: false, toggleLoginVisability: false };
  it('should say שלום איתי! and display log out button', () => {
    cy.mount(
      <AuthContext.Provider value={testAuthContext as unknown as IUseAuth}>
        <AppContext.Provider value={testAppContext as unknown as IUseWordle}>
          <Header />
        </AppContext.Provider>
      </AuthContext.Provider>
    );
    cy.get('.userArea').should('exist');
    cy.get('.userArea').get('button').should('contain', 'log out');
    cy.get('.userArea').should('contain', 'שלום איתי!');
  });
});
