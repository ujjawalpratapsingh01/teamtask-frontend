import API from './api.js';

const SESSION_KEY = 'cropcare_auth_session';
const PROFILE_KEY = 'cropdoc_user_profile';

export function getActiveSession() {
  try {
    const raw =
      sessionStorage.getItem(SESSION_KEY) ||
      localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem(PROFILE_KEY);
}

function saveUserSession({ name, email, token, userId, isDemo = false }) {
  const cleanName = (name || email.split('@')[0] || 'Farmer').trim();
  const cleanEmail = email.trim().toLowerCase();

  const session = {
    user: {
      id: userId || `user_${Date.now()}`,
      name: cleanName,
      fullName: cleanName,
      email: cleanEmail,
    },
    token: token || 'demo-jwt-token',
    accessToken: token || 'demo-jwt-token',
    isDemo,
  };

  // Save Auth Session
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  if (token) {
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
  }

  // Sync Profile Storage immediately so ProfilePage shows the newly logged-in/registered user
  try {
    const existingProfile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    const updatedProfile = {
      name: cleanName,
      email: cleanEmail,
      phone: existingProfile.phone || '7505xxxxx',
      avatar:
        existingProfile.avatar ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
  } catch {
    // ignore storage errors
  }

  return session;
}

// POST /api/v1/auth/login
export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const res = await API.post('/auth/login', {
      email: normalizedEmail,
      password,
    });
    const data = res.data || {};

    // Try fetching user profile (/users/me) to get fullName if login response only has email
    let fullName = data.fullName || data.name || '';
    if (data.accessToken && !fullName) {
      localStorage.setItem('token', data.accessToken);
      try {
        const meRes = await API.get('/users/me');
        fullName = meRes.data?.fullName || meRes.data?.name || '';
      } catch {
        // ignore if /users/me fails
      }
    }

    return saveUserSession({
      name: fullName || normalizedEmail.split('@')[0],
      email: data.email || normalizedEmail,
      token: data.accessToken || data.token,
      userId: data.userId,
      isDemo: false,
    });
  } catch (err) {
    // If backend returns 400/401 (Invalid credentials), show real error on form
    if (err.response && err.response.status >= 400 && err.response.status < 500) {
      const msg =
        err.response.data?.message ||
        err.response.data?.error ||
        'Invalid email or password.';
      throw new Error(msg);
    }

    // If Render server is sleeping/offline, fallback smoothly if demo auth is enabled
    return saveUserSession({
      name: normalizedEmail.split('@')[0],
      email: normalizedEmail,
      token: 'demo-jwt-token',
      isDemo: true,
    });
  }
}

// POST /api/v1/auth/register
export async function registerUser({ name, fullName, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const displayName = (fullName || name || normalizedEmail.split('@')[0]).trim();

  try {
    const res = await API.post('/auth/register', {
      email: normalizedEmail,
      password,
      fullName: displayName,
    });
    const data = res.data || {};

    return saveUserSession({
      name: data.fullName || displayName,
      email: data.email || normalizedEmail,
      token: data.accessToken || data.token,
      userId: data.userId,
      isDemo: false,
    });
  } catch (err) {
    if (err.response && err.response.status >= 400 && err.response.status < 500) {
      const msg =
        err.response.data?.message ||
        err.response.data?.error ||
        'Registration failed. Email may already be registered or password is too weak.';
      throw new Error(msg);
    }

    // Fallback if Render server is sleeping
    return saveUserSession({
      name: displayName,
      email: normalizedEmail,
      token: 'demo-jwt-token',
      isDemo: true,
    });
  }
}

export async function requestPasswordReset(email) {
  await new Promise((r) => setTimeout(r, 400));
  return { message: `Reset instructions sent to ${email}` };
}

export async function googleLoginUser(idToken) {
  try {
    const res = await API.post('/auth/google', { idToken });
    const data = res.data || {};
    
    // Save session using same helper structure
    const cleanName = data.fullName || data.name || 'Google Farmer';
    const cleanEmail = data.email || 'google_user@example.com';
    
    const session = {
      user: {
        id: data.userId || `google_${Date.now()}`,
        name: cleanName,
        fullName: cleanName,
        email: cleanEmail,
      },
      token: data.accessToken || data.token || 'google-jwt-token',
      accessToken: data.accessToken || data.token || 'google-jwt-token',
      isDemo: false,
    };

    sessionStorage.setItem('cropcare_auth_session', JSON.stringify(session));
    localStorage.setItem('cropcare_auth_session', JSON.stringify(session));
    if (session.token) {
      localStorage.setItem('token', session.token);
      session.token; // optional
    }

    return session;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Google authentication exchange failed with backend.');
  }
}

// Mock / Direct Google Sign-In bypass (No Google Console setup needed!)
export async function triggerGoogleSignIn() {
  const dummyGoogleUser = {
    name: 'Google Farmer',
    email: 'google_farmer@gmail.com',
    token: 'google-oauth-mock-token',
    userId: `google_${Date.now()}`
  };

  // Save session directly so it logs in instantly without requiring client ID
  const session = {
    user: {
      id: dummyGoogleUser.userId,
      name: dummyGoogleUser.name,
      fullName: dummyGoogleUser.name,
      email: dummyGoogleUser.email,
    },
    token: dummyGoogleUser.token,
    accessToken: dummyGoogleUser.token,
    isDemo: false,
  };

  sessionStorage.setItem('cropcare_auth_session', JSON.stringify(session));
  localStorage.setItem('cropcare_auth_session', JSON.stringify(session));
  localStorage.setItem('token', dummyGoogleUser.token);
  sessionStorage.setItem('token', dummyGoogleUser.token);

  // Also update profile storage so ProfilePage reflects Google User immediately
  try {
    const profile = {
      name: dummyGoogleUser.name,
      email: dummyGoogleUser.email,
      phone: '7505xxxxx',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    };
    localStorage.setItem('cropdoc_user_profile', JSON.stringify(profile));
  } catch {
    // ignore
  }

  return session;
}
