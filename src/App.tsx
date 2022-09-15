import UnauthenticatedApp from './routes/unauthenticatedApp'
import { useAuth } from './hooks/useAuth'
import AuthenticatedAppRoutes from './routes/authenticatedApp.routes'
import Spinner from './components/icons/spinner.icon'
import React from 'react'

function App () {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner isFullScreen/>
  }

  return (user !== null) ? <AuthenticatedAppRoutes/> : <UnauthenticatedApp/>
}

export default App
