const originalArgv = process.argv;

const runCommand = async (args: string[]) => {
  process.argv = ['node', 'app.ts', ...args];

  const { yarg } = await import('../../../src/config/plugins/yargs.plugin');

  return yarg;
};

describe('TestArgsPlugin', () => {
  afterEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should return true', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv.b).toBe(5);
  });
});
