
// Authentication System v6
// Simplified to ensure compatibility across all environments (HTTP/HTTPS)

const AUTH_SESSION_KEY = 'admin_session_v6';
const AUTH_CREDS_KEY = 'admin_creds_v6';

// Default Credentials
export const DEFAULT_USER = 'admin';
const DEFAULT_PASS_PLAIN = 'shiva@123'; 

export const SESSION_DURATION = 30 * 60 * 1000; // 30 mins
export const WARNING_THRESHOLD = 2 * 60 * 1000; // 2 mins warning

// Simple synchronous hash function (DJB2 variant)
// This avoids the need for crypto.subtle (Secure Context) which can fail in some previews
function simpleHash(str) {
  let hash = 0;
  if (str.length === 0) return '0';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// 1. Verify Credentials
export const checkCredentials = async (usernameInput, passwordInput) => {
  const user = usernameInput?.trim();
  const pass = passwordInput;

  if (!user || !pass) return false;

  // Priority 1: Hardcoded Default (Always works)
  if (user === DEFAULT_USER && pass === DEFAULT_PASS_PLAIN) {
    return true;
  }

  // Priority 2: Custom Credentials
  try {
    const stored = localStorage.getItem(AUTH_CREDS_KEY);
    if (stored) {
      const { username, hash } = JSON.parse(stored);
      if (user === username) {
        // Check hash
        return simpleHash(pass) === hash;
      }
    }
  } catch (e) {
    console.error('Auth storage read error', e);
  }

  return false;
};

// 2. Login
export const login = () => {
  const session = {
    isValid: true,
    loginTime: Date.now(),
    lastActivity: Date.now()
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

// 3. Logout
export const logout = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};

// 4. Check Auth State
export const isAuthenticated = () => {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return false;

    const session = JSON.parse(raw);
    if (!session.isValid) return false;

    if (Date.now() - session.loginTime > SESSION_DURATION) {
      logout();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

// 5. Update Activity
export const updateLastActivity = () => {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (raw) {
      const session = JSON.parse(raw);
      session.lastActivity = Date.now();
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    }
  } catch (e) {}
};

// 6. Get Activity Time
export const getLastActivity = () => {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw).lastActivity || 0 : 0;
  } catch (e) { return 0; }
};

// 7. Change Password
export const updateCredentials = async (newUser, newPass) => {
  try {
    const newHash = simpleHash(newPass);
    const data = {
      username: newUser.trim(),
      hash: newHash
    };
    localStorage.setItem(AUTH_CREDS_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Update credentials failed', e);
    return false;
  }
};

// 8. Get Current Username
export const getCurrentUsername = () => {
  try {
    const stored = localStorage.getItem(AUTH_CREDS_KEY);
    if (stored) return JSON.parse(stored).username;
  } catch (e) {}
  return DEFAULT_USER;
};
