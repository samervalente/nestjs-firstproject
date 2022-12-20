import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content(
      'Você recebeu um novo alerta para dev full stack',
    );

    expect(content).toBeTruthy();
  });

  it('should not to be able to create a notification content with less thant 5 characters', () => {
    expect(() => new Content('você')).toThrow();
  });

  it('should not to be able to create a notification content with greater thant 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
