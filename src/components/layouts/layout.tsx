import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Footer from './footer';
import Header from './header';
import { useAuth } from '../../hooks/useAuth';
import { RoutePaths } from '../../constants/route.constants';

export default function Layout({ children }: { children: ReactElement }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === RoutePaths.login;

  const handleAuth = () => {
    if (isLoginPage) {
      navigate(RoutePaths.home);
      return;
    }

    if (!isEmpty(user?.data)) {
      logout();
      return;
    }
    navigate(RoutePaths.login);
  };

  const buttonName = user?.data ? 'Logout' : 'Login';

  return (
    <div className="relative flex flex-col items-center w-full mx-auto md:w-5/6">
      <div className="absolute position right-10 top-10 flex flex-row gap-x-2">
        <button
          type="button"
          className="px-4 py-2 text-purple-500 duration-75 border border-purple-600 rounded-md hover:text-white hover:bg-purple-600"
          onClick={handleAuth}
        >
          {isLoginPage ? 'Go todos' : buttonName}
        </button>
      </div>

      <Header />
      {children}
      <Footer />
    </div>
  );
}
