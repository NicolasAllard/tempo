export type RegisterBody = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
};

export async function registerAccount(props: RegisterBody) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    }
  );

  const jsonResponse = await response.json();

  return { success: response.ok, message: jsonResponse.message };
}

export async function loginAccount(props: LoginBody) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });

  const jsonResponse = await response.json();

  return {
    success: response.ok,
    message: jsonResponse.message,
    user: jsonResponse.token
      ? {
          token: jsonResponse.token,
          firstName: jsonResponse.firstName,
          lastName: jsonResponse.lastName,
          email: jsonResponse.email,
        }
      : undefined,
  };
}
