import { SubmitHandler, useForm } from "react-hook-form";
import { LoginError, PageWrapper, FormWrapper } from "./LoginPage.style";
import { useState } from "react";
import { useAuthStore } from "@store/useAuthStore";
import { LoginFormFields } from "@interfaces";
import { CustomInput } from "@components/common";
import { loginFormValidationSchema } from "./hooks/useLoginFormValidationSchema";
import { useUsersStore } from "@store/useUsersStore";
import CustomButton from "@components/common/CustomButton/CustomButton";

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormFields>();

  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

  const { dispatchLogin: updateAuthState } = useAuthStore();

  const {callLoginApi} = useUsersStore();

  const login = (matricula: string, password: string) => {
    const user = callLoginApi(matricula, password);
    if (!user) {
      setFormErrorMessage("Credenciales invalidas");
      return;
    }else{
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    updateAuthState({user});
    setFormErrorMessage("");
  }

  const onLoginSubmit: SubmitHandler<LoginFormFields> = (
    formConntent: LoginFormFields
  ): void => login(formConntent.matricula, formConntent.password);

  return (
    <PageWrapper style={{backgroundColor:"#042160"}}>
      <h1 style={{color:"white"}}>Inicio de Sesión</h1>
      <FormWrapper onSubmit={handleSubmit(onLoginSubmit)}>
        <CustomInput
          label="Matricula"
          placeholder="Matricula"
          color="white"
          error={errors.matricula?.message}
          register={register("matricula", {
            ...loginFormValidationSchema.matricula,
          })}
        />
                <CustomInput
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          color="white"
          error={errors.password?.message}
          register={register('password', {
            ...loginFormValidationSchema.password,
          })}
        />
        {formErrorMessage && <LoginError>{formErrorMessage}</LoginError>}
        <CustomButton title="Ingresar" style={{backgroundColor:"#92212D"}}/>
      </FormWrapper>
    </PageWrapper>
  );
}
