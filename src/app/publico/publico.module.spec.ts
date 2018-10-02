import { PublicoModule } from './publico.module';

describe('PublicoModule', () => {
  let publicoModule: PublicoModule;

  beforeEach(() => {
    publicoModule = new PublicoModule();
  });

  it('should create an instance', () => {
    expect(publicoModule).toBeTruthy();
  });
});
