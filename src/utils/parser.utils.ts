import fs from 'fs';
import { FileNameEnum } from '../models/files/file.model';
import { ConfigPathEnum } from '../models/files/path.model';

export async function parseConfigFile(file: FileNameEnum) {
  try {
    const rawConfig = fs.readFileSync(`${ConfigPathEnum.PATH.slice(1)}/${file}`);
    const config = JSON.parse(rawConfig.toString());
    return config;
  } catch (err) {
    return false;
  }
}
