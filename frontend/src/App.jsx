import { useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const hideFooterRoutes = ['/add-posts', '/update-profile', '/chat'];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (loading && !user) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  ) 

  return (
    <div className="max-w-7xl bg-[#f9f9f9] text-black w-full min-h-screen">
      {isAuthenticated && <Header />}
      <div className="min-h-[calc(100vh-60px)]">
        <Outlet />
      </div>
      {isAuthenticated && showFooter && <Footer />}
      <Toaster />
    </div>
  );
};

export default App;