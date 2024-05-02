export const baseUrl = "http://localhost:3001";

export function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status}`);
  }
}

export function request(url: string, options: RequestInit): Promise<any> {
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    credentials: 'include' as RequestCredentials, 
  };
  return fetch(url, defaultOptions).then(checkResponse);
}

export function getPlayers(url: string): Promise<any> {
    return request(`${baseUrl}${url}`, {
      method: "GET",
    });
}

interface RegisterData {
  name: string;
}

export const register = (userData: RegisterData): Promise<any> => {
  const dataToSend = {
    ...userData,
    points: 1000
  };

  return request(`${baseUrl}/players`, {
    method: "POST",
    body: JSON.stringify(dataToSend),
  });
};
