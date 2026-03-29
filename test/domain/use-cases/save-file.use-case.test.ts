import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import * as fs from 'fs';

describe('SaveFileUseCase', () => {
  let saveFile: SaveFile;

  beforeEach(() => {
    saveFile = new SaveFile();
  });

  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs');
    if (outputFolderExist) fs.rmSync('outputs', { recursive: true });

    const customOutputFolderExist = fs.existsSync(
      customOptions.fileDestination,
    );
    if (customOutputFolderExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name',
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  it('should save file with default values', () => {
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };
    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(filePath); //ojo
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('should save file with custom values', () => {
    const result = saveFile.execute(customOptions);
    const checkFile = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  it('should return false if directory could not be created', () => {
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing');
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  it('should return false if file could not be created', () => {
    const writeFileSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message');
      });

    const result = saveFile.execute({ fileContent: 'Hola' });

    expect(result).toBeFalsy();

    writeFileSpy.mockRestore();
  });
});
