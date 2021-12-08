import { CircularObjectToJsonPipe } from './circular-object-to-json.pipe';

describe('CircularObjectToJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new CircularObjectToJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
