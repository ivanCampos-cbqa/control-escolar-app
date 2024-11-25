import { ReactNode } from 'react';

import { Navigate } from 'react-router';

import { useAuthStore } from '@store/useAuthStore';
import { ROLES_USUARIO } from '@interfaces';

export interface AuthenticateProps {
  /**
   * If `anonymous` is true, the component will render only when the user is **not** authenticated
   * (used for routes like `/login` or `/signup`).
   */
  anonymous?: boolean;
  /**
   * The content to render when the authentication condition is met.
   */
  children: ReactNode;
  /**
   * The path to redirect to if the authentication condition is not met.
   */
  redirectTo: string;

  allowedRoles?: ROLES_USUARIO[];
}

function Authenticate(props: AuthenticateProps) {
  const { children, redirectTo, anonymous, allowedRoles } = props;

  const isAuthenticated = useAuthStore(
    (state) => state.authState !== undefined,
  );

  const {authState} = useAuthStore();
  
  const isAllowedRole = authState?.user?.rol !== undefined && allowedRoles?.includes(authState.user.rol);

  // If the user is authenticated and the route is not anonymous (protected).
  // If the user is not authenticated and the route is anonymous (public).
  const shouldRenderChildren =
    (isAuthenticated && !anonymous &&isAllowedRole) || (!isAuthenticated && anonymous);

  return shouldRenderChildren ? children : <Navigate replace to={redirectTo} />;
}

export default Authenticate;
