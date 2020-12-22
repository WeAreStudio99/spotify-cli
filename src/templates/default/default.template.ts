import fs from 'fs-extra';
import { checkIfDirExistElseMakeDir } from '../../utils/file-checker.utils';

function createFile(
  filePath: string,
  fileName: string,
  fileContent: string,
  fileAlreadyExists = false,
): void {
  const filepath: string = `${process.cwd()}${filePath}/${fileName}`;
  fs.writeFile(filepath, fileContent, (error: Error) => {
    if (!error && !fileAlreadyExists) {
      //   return showCreate(fileName, filePath);
    }
    if (!error && fileAlreadyExists) {
      //   return showUpdate(fileName, filePath);
    }
    // return showError(error);
  });
}

export function defaultTemplate(
  fileNameWithExt: string,
  fileContent: string,
  hasPath = false,
  filePath = '',
) {
  checkIfDirExistElseMakeDir(hasPath, filePath);
  return createFile(filePath, fileNameWithExt, fileContent);
}
