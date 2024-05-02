import { createContext } from 'react';

interface User {
  name: string;
  points: number;
}

type CurrentUserContextType = User | null;

const CurrentUserContext = createContext<CurrentUserContextType>(null);

export default CurrentUserContext;
