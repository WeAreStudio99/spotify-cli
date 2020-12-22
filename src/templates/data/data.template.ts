import { FileNameEnum } from '../../models/file.model';
import { ConfigPathEnum } from '../../models/path.model';
import { defaultTemplate } from '../default/default.template';

export async function writeDataFile(data: any): Promise<any> {
  const fileName = FileNameEnum.USER_DATA;
  const hasPath = true;
  const filePath = ConfigPathEnum.PATH;

  console.log(data);

  const fileContent = (): string => JSON.stringify(data);

  return defaultTemplate(fileName, fileContent(), hasPath, filePath);
}
