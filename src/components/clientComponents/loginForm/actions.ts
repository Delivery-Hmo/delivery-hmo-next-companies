"use server";

import { post } from "@src/services/http/server";
import { redirect } from "@src/utils/functions";
import { getValuesFormData } from "@src/utils/serverFunctions";

interface LoginFormValues {
  email: string;
  password: string;
}

export const login = async (formData: FormData) => {
  try {
    const values: LoginFormValues = getValuesFormData(formData);

    console.log(values);
    /*  await post({
       baseUrl: "firebaseAuthApi",
       url: `signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
       body: loginFormValues
     });
 
     redirect("/inicio"); */
  } catch (error) {
    console.error("Error al iniciar sesión, error:", error);
    redirect("/iniciar-sesion?error=loginFailed");
  }
};