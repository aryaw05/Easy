import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { supabase } from "../utils";

// REGISTER
export default async function register(userData: {
  username: string;
  email: string;
  password: string;
}) {
  // query data
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", userData.email);
  const user = data && data.length > 0;
  if (user) {
    return {
      status: false,
      statusCode: 400,
      message: error,
    };
  } else {
    const hasPassword = await bcrypt.hash(userData.password, 10);
    await supabase.from("users").insert([
      {
        username: userData.username,
        email: userData.email,
        password_hash: hasPassword,
      },
    ]);
    return {
      status: true,
      statusCode: 200,
      message: "Success",
    };
  }
}

// LOGIN
export async function login(userData: { email: string }) {
  // query data
  const { data } = await supabase
    .from("users")
    .select()
    .eq("email", userData.email);
  const user = data && data[0];
  if (user) {
    return user;
  } else {
    return null;
  }
}

// LOGIN WITH GOOGLE
export async function loginWithGoogle(userData: any, callback: any) {
  // query data
  const { data } = await supabase
    .from("users")
    .select()
    .eq("email", userData.email);
  const user = data && data.length > 0;

  // update jika terdapat perubahan pada akun google
  if (user) {
    await supabase
      .from("users")
      .update({ username: userData.username, email: userData.email })
      .eq("id", data[0].id)
      .then(() => callback({ status: true, data }));
  } else {
    await supabase
      .from("users")
      .insert([
        {
          username: userData.username,
          email: userData.email,
        },
      ])
      .then(() => callback({ status: true, data }));
  }
}
