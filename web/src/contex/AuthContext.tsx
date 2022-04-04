import React, { createContext, useCallback, useState } from 'react';
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

export const AuthContex = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
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
