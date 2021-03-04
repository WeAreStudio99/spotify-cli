import keytar from 'keytar';

export default class KeychainService {
  service: string = 'spotify-hl';
  user: string = 'spotify-user';

  /**
   * Save token in keychain
   * @param token
   * @param userName
   * @param serviceName
   */
  saveTokenInKeychain = async (
    token: string,
    userName = this.user,
    serviceName = this.service,
  ): Promise<void> => {
    try {
      keytar.setPassword(serviceName, userName, token);
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * Check if token exists
   *@returns {boolean} true or false
   */
  checkToken = async (): Promise<boolean> => {
    try {
      if (keytar.getPassword(this.service, this.user) !== null) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * Return token from keychain
   * @param userName
   * @param serviceName
   */
  getTokenInKeychain = async (userName = this.user, serviceName = this.service) => {
    try {
      const token = keytar.getPassword(serviceName, userName);
      return token;
    } catch (err) {
      throw new Error(err);
    }
  };
}
