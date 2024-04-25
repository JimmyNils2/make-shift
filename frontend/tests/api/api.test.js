import { api } from '../../src/api';

describe('api test suite', () => {
  
  test('Should have default config', () => {

    // Arrange
    const targetURL = api.defaults.baseURL;
    const expectedURL = process.env.VITE_API_URL

    // Assert
    expect(targetURL).toBe(expectedURL)
  });

  test('Should have the test token', async () => {

    // Arrange
    const testToken = {'access': 'testValue'};
    const testURL = 'testURL'

    // Act
    localStorage.setItem('access', testToken.testKey);
    const res = await api.get(testURL);

    // Assert
    expect(res.config.headers.Authorization).toBe(testToken.testKey);
  });
})