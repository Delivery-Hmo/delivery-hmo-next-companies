"use server";

import { getValuesFormData } from "@src/utils/serverFunctions";
import { LoginFormValues } from ".";
import { get, post } from "@src/services/http/server";
import { FirebaseAuth, FirebaseAuthError } from "@src/interfaces/services/firebaseAuth";
import { Url } from "@src/types/navigation";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export const login = async (formData: FormData) => {
  const body: LoginFormValues = await getValuesFormData(formData);
  const firebaseKey = process.env.FIREBASE_API_KEY;
  let redirectPath: Url = "/inicio?reload=true";

  try {
    const firebaseAuth = await post<FirebaseAuth>({
      baseUrl: "firebaseAuthApi",
      url: `signInWithPassword?key=${firebaseKey}`,
      body: { ...body, returnSecureToken: true },
    });

    console.log(firebaseAuth);

    const cookieStore = await cookies();

    cookieStore.set("firebaseAuth", JSON.stringify(firebaseAuth));
  } catch (error) {
    console.error("Error al iniciar sesión, error:", error);

    if (typeof (error as { message?: string; })?.message === "string") {
      const errorData = JSON.parse((error as { message: string; }).message) as FirebaseAuthError;

      if (errorData.error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
        redirectPath = `/iniciar-sesion?error=invalidCredentials&email=${body.email}`;
        return;
      }
    }

    redirectPath = `/iniciar-sesion?error=loginFailed&email=${body.email}`;
  } finally {
    redirect(redirectPath);
  }
};