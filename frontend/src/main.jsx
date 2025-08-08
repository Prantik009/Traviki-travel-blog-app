import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store.js';
import {
  checkAuth,
  setupSocketConnection,
  disconnectSocket,
  socket,
  logout as logoutAction,
} from './store/slices/authSlice';
import { addNewMessage } from './store/slices/chatSlice';

import './index.css';
import App from './App.jsx';
import { AuthLayout } from './components/auth/AuthLayout.jsx';
import { Login } from './components/auth/Login.jsx';
import { Signup } from './components/auth/Signup.jsx';
import {
  AddBlogPage,
  ChatPage,
  HomePage,
  MyBlogsPage,
  ProfilePage,
  ReadBlogPage,
} from './pages';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  // Initial auth check on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Setup socket connection after successful auth
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(setupSocketConnection(user._id));

      socket?.on('newMessage', (message) => {
        dispatch(addNewMessage(message));
      });

      return () => {
        socket?.off('newMessage');
        dispatch(disconnectSocket());
      };
    } else {
      dispatch(disconnectSocket());
    }
  }, [isAuthenticated, user, dispatch]);

  // Auto logout on auth failure
  useEffect(() => {
    if (error === 'Not Authenticated.') {
      dispatch(logoutAction());
    }
  }, [error, dispatch]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={true}>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/my-posts',
        element: (
          <AuthLayout authentication={true}>
            <MyBlogsPage />
          </AuthLayout>
        ),
      },
      {
        path: '/add-posts',
        element: (
          <AuthLayout authentication={true}>
            <AddBlogPage />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <ReadBlogPage />
          </AuthLayout>
        ),
      },
      {
        path: '/update-profile',
        element: (
          <AuthLayout authentication={true}>
            <ProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: '/chat',
        element: (
          <AuthLayout authentication={true}>
            <ChatPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </StrictMode>
);
