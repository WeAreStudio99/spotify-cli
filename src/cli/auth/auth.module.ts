import AuthService from './services/auth.service';
import KeychainService from './utils/keychain.service';

export default class AuthModule {
  private readonly _keychainService = new KeychainService();

  private readonly _authService = new AuthService();

  init = async () => {
    try {
      const tokenExist = await this._keychainService.checkToken();
      if (tokenExist) {
        await this._authService.authorizationRequest();
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}
