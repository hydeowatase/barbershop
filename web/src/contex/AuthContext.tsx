import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCreadencials {
  email: string;
  password: string;
}

interface AuthContexData {
  user: object;
  signIn(credencials: SignInCreadencials): Promise<void>;
}

const AuthContex = createContext<AuthContexData>({} as AuthContexData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Barbershop:token');
    const user = localStorage.getItem('@Barbershop:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, userWithoutPassword } = response.data;

    localStorage.setItem('@Barbershop:token', token);
    localStorage.setItem(
      '@Barbershop:user',
      JSON.stringify(userWithoutPassword),
    );

    setData({ token, user: userWithoutPassword });
  }, []);

  return (
    <AuthContex.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContex.Provider>
  );
};

function useAuth(): AuthContexData {
  const context = useContext(AuthContex);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
