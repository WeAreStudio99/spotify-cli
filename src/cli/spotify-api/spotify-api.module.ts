import axios from 'axios';
import KeychainService from '../auth/utils/keychain.service';

export default class SpotifyApiModule {
  private readonly _keychainService = new KeychainService();

  private urlStandard = 'https://api.spotify.com/v1';

  private urlMe = `${this.urlStandard}/me`;

  private async initAuthToken() {
    const accessToken = await this._keychainService.getTokenInKeychain('access_token');
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  /**
   * @description
   *
   * Get detailed profile information about the current
   * user (including the current user’s username) and store data in `.config/user_data.json`
   *
   * @see [User Endpoint Guide](https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/).
   *
   */
  async getUserInfo() {
    try {
      await this.initAuthToken();
      const response = await axios.get(`${this.urlMe}`);
      const data = await response.data;
      console.log(axios.defaults.headers.common.Authorization);
      console.log(data);
    } catch (err) {
      throw new Error(err);
    }
  }
}
