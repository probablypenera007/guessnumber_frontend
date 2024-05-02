
export const baseUrl = "http://localhost:3001";


export function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status}`);
  }
}

export function request(url: string, options: RequestInit): Promise<any> {
  return fetch(url, options).then(checkResponse);
}


export function getPlayers(url: string): Promise<any> {
    return request(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  };