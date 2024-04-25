import {onOpenDateModal, uiSlice} from '../../../src/store';

describe('uiSlice test suite', () => {

  test('Should return the initial state', () => {

    // Arrange 
    const initialState = {
      isDateModalOpen: false
    };

    // Act
    const targetState = uiSlice.getInitialState();

    // Assert
    expect(targetState).toEqual(initialState);
  });

  test('Should change the state property', () => {
    
    // Arrange
    let initialState = uiSlice.getInitialState();

    // Act
    let newState = uiSlice.reducer(initialState, onOpenDateModal());

    // Assert
    expect(newState.isDateModalOpen).toBeTruthy();
  });
})