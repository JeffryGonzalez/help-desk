

export function getApiUrl() {
  const backendHost = getCurrentHost();

  return `${backendHost}/api/`;
}

export function getCurrentHost() {
  const host = window.location.host;
  const url = `${window.location.protocol}//${host}`;
  return url;
}

