import SpotifyApiModule from '../spotify-api/spotify-api.module';

export default class ChatModule {
  private readonly _spotifyApiModule = new SpotifyApiModule();

  async init() {
    try {
      await this._spotifyApiModule.getUserInfo();
    } catch (err) {
      throw new Error(err);
    }
  }
}
