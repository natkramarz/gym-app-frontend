export function getUsername() {
  return sessionStorage.getItem("username") || null;
}

export function getToken() {
  return sessionStorage.getItem("token") || null;
}

export function removeUserSession() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
}

export function setUserSession(token: string, username: string) {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username);
}
