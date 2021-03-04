import { Command } from '@oclif/command';
import AuthModule from '../cli/auth/auth.module';
import ChatModule from '../cli/chat/chat.module';

export default class Explore extends Command {
  static description = 'Explore your Spotify universe with a single command';

  static examples = [
    `$ spotify-hl explore
`,
  ];

  static flags = {};

  static args = [];

  private _authModule = new AuthModule();

  private _chatModule = new ChatModule();

  async run() {
    // const { args, flags } = this.parse(Explore);
    await this._authModule.init();

    await this._chatModule.init();
  }
}
