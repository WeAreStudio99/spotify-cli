import { terminal } from 'terminal-kit';
import { FileNameEnum } from '../models/files/file.model';
import { IUser } from '../models/spotify/user.model';
import { api } from '../spotify-api';
import { termConfig } from '../templates/term';
import { parseConfigFile } from '../utils/parser.utils';

async function bootQuestion(user: IUser) {
  terminal.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, (error, result) => {
    if (result) {
      terminal.brightCyan(`[${user.uri.split('user:')[1]}] > Ok let‘s go`);
      terminal.slowTyping('[ek] > Wise choice my deer \n', termConfig.slowTypingConfig);
      process.exit();
    } else {
      terminal.brightCyan(`[${user.uri.split('user:')[1]}] > No thanks ...\n`);
      terminal.slowTyping(
        `[ek] > DON'T MESS WITH ME ${user.display_name} !!!\n`,
        termConfig.slowTypingConfig,
      );
      bootQuestion(user);
    }
  });
}

export function welcomeQuestion() {
  api.getUserInfo().then(async () => {
    const user = (await parseConfigFile(FileNameEnum.USER_DATA)) as IUser;
    terminal.slowTyping(
      `[ek] > Welcome ${user.uri.split('user:')[1]} or should I say ${user.display_name}\n`,
      termConfig.slowTypingConfig,
      async () => {
        terminal.slowTyping(
          '[ek] > Do you want to explore your Spotify universe ? [Y|n]\n',
          termConfig.slowTypingConfig,
        );
        await bootQuestion(user);
      },
    );
  });
}
