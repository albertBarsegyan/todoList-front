import { RoutePaths } from '../constants/route.constants'
import ErrorPage from '../pages/404.page'
import Login from '../pages/login.page'
import Registration from '../pages/registration.page'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function UnauthenticatedApp () {
  return (
    <Routes>
      <Route path={RoutePaths.LOGIN} element={<Login />} />
      <Route path={RoutePaths.REGISTER} element={<Registration />} />
      <Route path={RoutePaths.ERRORPAGE} element={<ErrorPage />} />
      <Route path="*" element={<Navigate replace to={RoutePaths.LOGIN} />} />
    </Routes>
  )
}
