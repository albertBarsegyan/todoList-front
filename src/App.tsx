import React from 'react';
import { isEmpty } from 'lodash';
import UnauthenticatedApp from './routes/unauthenticatedApp';
import { useAuth } from './hooks/useAuth';
import AuthenticatedAppRoutes from './routes/authenticatedApp.routes';

function App() {
  const { user } = useAuth();

  return !isEmpty(user) ? <AuthenticatedAppRoutes /> : <UnauthenticatedApp />;
}

export default App;
