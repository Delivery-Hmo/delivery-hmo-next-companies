"use server";

import { getValuesFormData } from "@src/utils/serverFunctions";
import { LoginFormValues } from ".";
import { post } from "@src/services/http/server";
import { FirebaseAuth, FirebaseAuthError } from "@src/interfaces/services/firebaseAuth";
import { Url } from "@src/types/navigation";
import { redirect, RedirectType } from "next/navigation";
import { createSession } from "@src/lib/session";

export const login = async (formData: FormData) => {
  const body: LoginFormValues = await getValuesFormData(formData);
  const firebaseKey = process.env.FIREBASE_API_KEY;
  let redirectPath: Url = "/inicio";

  try {
    const firebaseAuth = await post<FirebaseAuth>({
      baseUrl: "firebaseAuthApi",
      url: `accounts:signInWithPassword?key=${firebaseKey}`,
      body: { ...body, returnSecureToken: true },
    });

    if (firebaseAuth instanceof Error) {
      console.error("Error al iniciar sesión, error:", firebaseAuth);

      if (firebaseAuth.message.includes("INVALID_LOGIN_CREDENTIALS")) {
        redirectPath = `/iniciar-sesion?error=invalidCredentials&email=${body.email}`;
        return;
      }

      redirectPath = `/iniciar-sesion?error=loginFailed&email=${body.email}`;
      return;
    }

    await createSession(firebaseAuth);
  } catch (error) {
    console.error("Error al iniciar sesión, error:", error);
    redirectPath = `/iniciar-sesion?error=loginFailed&email=${body.email}`;
  } finally {
    redirect(redirectPath, RedirectType.push);
  }
};