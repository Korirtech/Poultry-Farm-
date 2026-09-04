// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
export type FlocklineRole = "admin" | "manager" | "worker";

export type AuthUser = {
  id: string | number;
  name: string;
  email: string;
  role: FlocklineRole;
  farmIds: Array<string | number>;
};

const apiBaseUrl = (import.meta.env.VITE_DJANGO_API_URL || "").replace(
  /\/$/,
  ""
);

export function isDjangoConfigured() {
  return apiBaseUrl.length > 0;
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthUser> {
  if (!apiBaseUrl)
    throw new Error(
      "Django API is not configured. Set VITE_DJANGO_API_URL before enabling sign-in."
    );
  const response = await fetch(`${apiBaseUrl}/api/auth/login/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok)
    throw new Error("The sign-in details could not be verified.");
  return response.json() as Promise<AuthUser>;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!apiBaseUrl) return null;
  const response = await fetch(`${apiBaseUrl}/api/auth/me/`, {
    credentials: "include",
  });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("The current session could not be loaded.");
  return response.json() as Promise<AuthUser>;
}

export async function signOut() {
  if (!apiBaseUrl) return;
  await fetch(`${apiBaseUrl}/api/auth/logout/`, {
    method: "POST",
    credentials: "include",
  });
}
