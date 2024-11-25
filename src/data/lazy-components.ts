import { lazy } from "react";

export const LazyComponents = {
  LoginPage: lazy(() => import ('@pages/LoginPage')),
  HomePage: lazy(() => import ('@pages/HomePage')),
  CalificacionesPage: lazy(() => import ('@pages/Calificaciones')),
}