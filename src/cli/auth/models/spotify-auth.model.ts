export interface SpotifyAuth {
  RESPONSE_TYPE: string;
  CLIENT_ID: string;
  CLIENT_SECRET?: string;
  PORT: number;
  SHOW_DIALOG?: boolean;
  SCOPE: string;
  CODE?: string;
  GRANT_TYPE?: string;
  URL?: string;
  REDIRECT_URI: string;
}
