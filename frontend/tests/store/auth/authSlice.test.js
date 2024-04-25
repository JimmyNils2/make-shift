import { authSlice, onLogin, onLogout } from '../../../src/store';
import { authenticatedState, initialState, notAuthenticatedState } from '../../__fixtures__/authStates';
import { testUserCredentials } from '../../__fixtures__/testUser';

describe('authSlice test suite', () => {
  test('Should return the initial state', () => {
    
    // Arrange
    const initState = initialState
    
    // Assert
    expect(authSlice.getInitialState()).toEqual(initState);
  });

  test('Should log in', () => {
    // Arrange
    const initState = initialState;
    const authState = authenticatedState;
    
    // Act
    const newState = authSlice.reducer(initState, onLogin(testUserCredentials));

    // Assert
    expect(newState).toEqual(authState);
  });

  test('Should log out', () => {
    // Arrange
    const authState = authenticatedState;
    const initState = notAuthenticatedState;

    // Act
    const newState = authSlice.reducer(authState, onLogout());

    // Arrange
    expect(newState).toEqual(initState);
  })
});