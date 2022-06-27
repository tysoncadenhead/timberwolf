import {metaMask} from '../metaMask';

describe('MetaMask', () => {
  it('Should return if a null is provided', () => {
    const result = metaMask(null);

    expect(result).toBe(null);
  });

  it('Should return the keys in the object', () => {
    const result = metaMask<{
      hello: string;
    }>({
      hello: 'Hi',
    });

    expect(result.hello).toBe('Hi');
  });

  it('Should mask passwords', () => {
    const result = metaMask<{
      password: string;
    }>({
      password: 'Hi',
    });

    expect(result.password).toBe('******');
  });
});
