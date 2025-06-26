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