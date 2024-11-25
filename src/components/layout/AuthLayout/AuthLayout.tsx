import { ReactNode } from "react";
import { AuthLayoutWrapper, NavBar } from "./AuthLayout.style";
import { useAuthStore } from "@store/useAuthStore";
import { ROLES_USUARIO } from "@interfaces";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

interface NavBarItem {
  label: string;
  path: string;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();
  const { authState, dispatchSignOut: signOut } = useAuthStore();
  const isAdmin = authState?.user.rol === ROLES_USUARIO.ADMIN;

  const adminNavBar: NavBarItem[] = [
    {
      label: "Alumnos",
      path: "/alumnos",
    },
    {
      label: "Materias",
      path: "/materias",
    },
  ];

  const alumnoNavBar: NavBarItem[] = [
    {
      label: "Calificaciones y Materias",
      path: "/calificaciones",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getNavBarItems = () => {
    return isAdmin ? adminNavBar : alumnoNavBar;
  };

  return (
    <AuthLayoutWrapper>
      <NavBar>
        {getNavBarItems().map((item) => (
          <p key={item.path} onClick={() => handleNavigation(item.path)}>
            {item.label}
          </p>
        ))}
        <p onClick={signOut}>Cerrar Sesión</p>
      </NavBar>
      {children}
    </AuthLayoutWrapper>
  );
}
