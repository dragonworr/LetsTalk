import { render, screen } from '@testing-library/react';
import {
  AuthProvider,
  signInWithEmailAndPassword,
  sendEmailToRecoverPassword,
} from '../../contexts/AuthContext';
import {
  signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../services/firebase';
import nookies from 'nookies';
import Conversations from '../../pages/conversas';
import { act } from 'react-dom/test-utils';

jest.mock('nookies', () => {
  return {
    set: jest.fn(),
  };
});

jest.mock('../../services/firebase', () => {
  return {
    auth: {
      onIdTokenChanged: jest
        .fn()
        .mockImplementationOnce((callback: () => void) => {
          callback();
        })
        .mockImplementation(
          (
            callback: (user: {
              getIdToken: () => string;
              email: string;
            }) => void
          ) => {
            callback({
              getIdToken: () => 'fake-token',
              email: 'email@gmail.com',
            });
          }
        ),
    },
  };
});

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({
      user: 'fake-user',
    }),
    sendPasswordResetEmail: jest.fn(),
  };
});

describe('Auth context', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <Conversations />
        </AuthProvider>
      );
    });
  });

  it("if there is no user connected, you must reset the token's cookie and set the user state to null", () => {
    expect(screen.queryByText('email@gmail.com')).not.toBeInTheDocument();
    expect(nookies.set).toHaveBeenCalledWith(undefined, 'token', '', {
      path: '/',
    });
  });

  it("if any user is connected, you must set the user's state and set his token in the cookies", async () => {
    expect(await screen.findByText('email@gmail.com')).toBeInTheDocument();
    expect(nookies.set).toHaveBeenCalledWith(undefined, 'token', 'fake-token', {
      path: '/',
    });
  });

  it('renders correctly', () => {
    expect(screen.getByText('Conversations')).toBeInTheDocument();
  });

  it('signInWithEmailAndPassword function should return login result', async () => {
    const loginResult = await signInWithEmailAndPassword({
      email: 'email@gmail.com',
      password: '123456',
    });

    expect(FirebaseSignInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'email@gmail.com',
      '123456'
    );

    expect(loginResult).toStrictEqual({ user: 'fake-user' });
  });

  it('sendEmailToRecoverPassword function should run sendPasswordResetEmail from firebase', async () => {
    await sendEmailToRecoverPassword({ email: 'email@gmail.com' });

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      'email@gmail.com'
    );
  });
});
