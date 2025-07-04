export interface FirebaseAuth {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

export interface FirebaseAuthError {
  error: {
    code: number;
    message: string;
    errors: Array<{
      message: string;
      domain: string;
      reason: string;
      location: string;
      locationType: string;
    }>;
    status: string;
    details: Array<{
      "@type": string;
      reason: string;
      metadata: {
        method: string;
        service: string;
      };
    }>;
  };
}

export interface FirebaseTokenData {
  iss: string; // issuer
  aud: string; // audience
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number; // issued at
  exp: number; // expiration
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}

export interface RefreshTokenResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}