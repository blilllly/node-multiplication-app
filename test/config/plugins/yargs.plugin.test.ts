const runCommand = async (args: string[]) => {
  process.argv = ['node', 'app.ts', ...args];

  const { yarg } = await import('../../../src/config/plugins/yargs.plugin');

  return yarg;
};

describe('TestArgsPlugin', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should return true', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      }),
    );
  });

  it('shoul return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '7',
      '-l',
      '20',
      '-s',
      'true',
      '-n',
      'test-custom-n',
      '-d',
      'test-custom-d',
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 7,
        l: 20,
        s: true,
        n: 'test-custom-n',
        d: 'test-custom-d',
      }),
    );
  });
});
