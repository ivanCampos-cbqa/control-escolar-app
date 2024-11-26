import { RouteObject } from "react-router-dom";
import { ALUMNOS_PATH, CALIFICACIONES_PATH, HOME_PATH, LOGIN_PATH, MATERIAS_PATH } from "./paths";
import { LazyComponents } from "./lazy-components";
import ErrorBoundaryPage from "@pages/ErrorBoundaryPage";
import Authenticate from "@components/guards/Authenticate";
import { WithSuspense } from "@components/common";
import AuthLayout from "@components/layout/AuthLayout/AuthLayout";
import { ROLES_USUARIO } from "@interfaces";
import MateriasPage from "@pages/MateriasPage";
import Alumnos from "@pages/AlumnosPage";

const { LoginPage, HomePage } = LazyComponents;

const loggedOutRoutes: RouteObject[] = [
  {
    path: LOGIN_PATH,
    element: <LoginPage />,
    errorElement: <ErrorBoundaryPage />,
  },
];

const loggedInRoutes: RouteObject[] = [
  {
    path: HOME_PATH,
    element: <HomePage />,
    errorElement: <ErrorBoundaryPage />,
  },
];

const adminRoutes: RouteObject[] = [
  {
    path: ALUMNOS_PATH,
    element: <Alumnos/>,
    errorElement: <ErrorBoundaryPage/>
  },
  {
    path: MATERIAS_PATH,
    element: <MateriasPage/>,
    errorElement: <ErrorBoundaryPage/>
  }
]

const alumnoRoutes: RouteObject[] = [
  {
    path: CALIFICACIONES_PATH,
    element: <div>Calificaciones</div>,
    errorElement: <ErrorBoundaryPage/>
  }
]

export const UnauthenticatedRoutes: RouteObject[] = loggedOutRoutes.map(
  (route: RouteObject) => {
    return {
      ...route,
      element: (
        <Authenticate anonymous redirectTo={"/home"}>
          <WithSuspense>{route.element}</WithSuspense>
        </Authenticate>
      ),
    };
  }
);

export const AuthenticatedRoutes: RouteObject[] = loggedInRoutes.map(
  (route: RouteObject) => {
    return {
      ...route,
      element: (
        <Authenticate redirectTo={LOGIN_PATH} allowedRoles={[ROLES_USUARIO.ALUMNO, ROLES_USUARIO.ADMIN]}>
          <AuthLayout>
            <WithSuspense>{route.element}</WithSuspense>
          </AuthLayout>
        </Authenticate>
      ),
    };
  }
);

export const AdminRoutes: RouteObject[] = adminRoutes.map(
  (route: RouteObject) => {
    return {
      ...route,
      element: (
        <Authenticate redirectTo={LOGIN_PATH} allowedRoles={[ROLES_USUARIO.ADMIN]}>
          <AuthLayout>
            <WithSuspense>{route.element}</WithSuspense>
          </AuthLayout>
        </Authenticate>
      ),
    };
  }
)

export const AlumnoRoutes: RouteObject[] = alumnoRoutes.map(
  (route: RouteObject) => {
    return {
      ...route,
      element: (
        <Authenticate redirectTo={LOGIN_PATH} allowedRoles={[ROLES_USUARIO.ALUMNO]}>
          <AuthLayout>
            <WithSuspense>{route.element}</WithSuspense>
          </AuthLayout>
        </Authenticate>
      ),
    };
  }
)
