export type RegisterBody = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
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
