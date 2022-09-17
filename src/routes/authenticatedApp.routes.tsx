import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutePaths } from '../constants/route.constants';
import Home from '../pages/home.page';
import Login from '../pages/login.page';

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.home} element={<Home />} />
      <Route path="*" element={<Navigate replace to={RoutePaths.home} />} />
    </Routes>
  );
}
