import { FileNameEnum } from '../../models/file.model';
import { ConfigPathEnum } from '../../models/path.model';
import { defaultTemplate } from '../default/default.template';

export async function writeDataFile(fileName: FileNameEnum, data: any): Promise<any> {
  const hasPath = true;
  const filePath = ConfigPathEnum.PATH;

  const fileContent = (): string => JSON.stringify(data);
  return defaultTemplate(fileName, fileContent(), hasPath, filePath);
}
