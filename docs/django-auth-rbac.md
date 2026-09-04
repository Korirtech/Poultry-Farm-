# Flockline Django authentication and RBAC contract

The static frontend is prepared to connect to a Django API through `VITE_DJANGO_API_URL`. The browser adapter is intentionally small: it starts a session, loads the current user, and ends the session. Django remains the source of truth for authentication, group membership, farm scope, and permission checks.

## Expected endpoints

| Method | Endpoint            | Purpose                                                                                                      |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/auth/login/`  | Accept `{ "email": string, "password": string }`; create a secure session and return the authenticated user. |
| GET    | `/api/auth/me/`     | Return the current user, role, and permitted farm IDs; return `401` when no session exists.                  |
| POST   | `/api/auth/logout/` | Invalidate the current session and return a success response.                                                |

## Expected user shape

```json
{
  "id": 42,
  "name": "Amina Korir",
  "email": "amina@example.com",
  "role": "manager",
  "farmIds": [7]
}
```

The supported frontend role keys are `admin`, `manager`, and `worker`. The Django project should map these to groups or permissions and should enforce the final authorization decision on every protected request. Client-side role labels and links are navigation aids, not a security boundary.

## Session and security requirements

Use secure, HTTP-only cookies for a browser session, configure CSRF protection for state-changing requests, serve the API and frontend over HTTPS, and validate farm scope on the server. The frontend uses `credentials: "include"`; cross-origin deployments therefore need an explicit, restricted CORS and CSRF configuration.

## Integration steps

1. Set `VITE_DJANGO_API_URL` in the deployment environment.
2. Implement the three endpoints above in Django, preferably using Django auth and groups or a deliberate permission mapping.
3. Return the authenticated user’s role and permitted farm IDs from `/api/auth/me/`.
4. Replace the onboarding completion placeholder with a POST request that creates the farm and first flock.
5. Protect every data endpoint server-side; never rely on hidden buttons or route visibility in the React application.
