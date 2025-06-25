"use server";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Datos recibidos:", { email, password });
}