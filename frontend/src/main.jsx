import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import store from './store/store.js';
import { checkAuth, setupSocketConnection, disconnectSocket, socket } from './store/slices/authSlice';
import { addNewMessage } from './store/slices/chatSlice';

import './index.css';
import App from './App.jsx';
import { AuthLayout } from './components/auth/AuthLayout.jsx';
import { Login } from './components/auth/Login.jsx';
import { Signup } from './components/auth/Signup.jsx';
import { AddBlogPage, ChatPage, HomePage, MyBlogsPage, ProfilePage, ReadBlogPage } from './pages';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(setupSocketConnection(user._id));

      socket?.on("newMessage", (message) => {
        dispatch(addNewMessage(message));
      });

      return () => {
        socket?.off("newMessage");
      };
    }
  }, [isAuthenticated, user, dispatch]);

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
    <Provider store={store}>
      <AppWrapper />
    </Provider>
);