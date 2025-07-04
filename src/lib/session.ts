import 'server-only';
import { FirebaseAuth, RefreshTokenResponse } from "@src/interfaces/services/firebaseAuth";
import { cookies } from "next/headers";

export const createSession = async (firebaseAuth: FirebaseAuth) => {
  const cookieStore = await cookies();

  cookieStore.set("firebaseAuth", JSON.stringify(firebaseAuth), { secure: true });
};

export const updateSession = async (refreshTokenResponse: RefreshTokenResponse, firebaseAuth: FirebaseAuth) => {
  try {
    const { id_token, refresh_token, expires_in } = refreshTokenResponse;
    const newFirebaseAuth: FirebaseAuth = {
      ...firebaseAuth,
      idToken: id_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };

    await createSession(newFirebaseAuth);
  } catch (error) {
    console.log(error);
    return null;
  }
};