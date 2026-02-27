import { auth } from "@src/services/firebase";
import { User, getAuth, onIdTokenChanged, signInWithEmailAndPassword } from "firebase/auth";

export const getCurrentUser = () => new Promise<User>((resolve, reject) => {
  const uns = onIdTokenChanged(
    getAuth(),
    (user) => {
      uns();

      if (!user) {
        reject("Error de autenticación");
        return;
      }

      resolve(user);
    },
    () => reject("Error de autenticación")
  );
});

export const getCurrentToken = () => new Promise<string>((resolve, reject) => {
  const uns = onIdTokenChanged(
    auth,
    async (user: User | null) => {
      uns();

      if (!user) {
        reject(new Error("Error de autenticación."));
        return;
      }

      const token = await user.getIdToken();

      resolve(token);
    },
    (error) => {
      console.log(error);
      reject(new Error("Error de autenticación."));
    }
  );
});