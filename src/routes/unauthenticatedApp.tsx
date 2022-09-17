import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../constants/route.constants';
import ErrorPage from '../pages/404.page';
import Login from '../pages/login.page';
import Home from '../pages/home.page';

export default function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.error} element={<ErrorPage />} />
      <Route path={RoutePaths.home} element={<Home />} />
      <Route path="*" element={<Navigate replace to={RoutePaths.home} />} />
    </Routes>
  );
}
