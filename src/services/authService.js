const SESSION_KEY = 'cropcare_auth_session';

export function getActiveSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function loginUser({ email }) {
  await new Promise((r) => setTimeout(r, 400));
  const normalizedEmail = email.trim().toLowerCase();
  const session = {
    user: { name: normalizedEmail.split('@')[0], email: normalizedEmail },
    token: 'demo-jwt-token',
    isDemo: true
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function registerUser({ name, email }) {
  await new Promise((r) => setTimeout(r, 450));
  const session = {
    user: { name: name.trim(), email: email.trim().toLowerCase() },
    token: 'demo-jwt-token',
    isDemo: true
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function requestPasswordReset(email) {
  await new Promise((r) => setTimeout(r, 400));
  return { message: `Reset instructions sent to ${email}` };
}

export function triggerGoogleSignIn() {
  throw new Error('Google Sign-In requires VITE_GOOGLE_CLIENT_ID from your team. Please login with Email & Password.');
}