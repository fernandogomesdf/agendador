import { GestaoModule } from './gestao.module';

describe('GestaoModule', () => {
  let gestaoModule: GestaoModule;

  beforeEach(() => {
    gestaoModule = new GestaoModule();
  });

  it('should create an instance', () => {
    expect(gestaoModule).toBeTruthy();
  });
});
