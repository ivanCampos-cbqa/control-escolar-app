import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LOGIN_PATH } from './paths'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ErrorBoundaryPage from '@pages/ErrorBoundaryPage';
import { AuthenticatedRoutes, UnauthenticatedRoutes, AdminRoutes, AlumnoRoutes } from './routes-config';

export const appRouters = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={LOGIN_PATH} replace/>,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
    errorElement: <ErrorBoundaryPage />,
  },
  ...UnauthenticatedRoutes,
  ...AuthenticatedRoutes,
  ...AdminRoutes,
  ...AlumnoRoutes,
])