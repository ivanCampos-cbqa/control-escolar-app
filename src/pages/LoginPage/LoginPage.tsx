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
    <PageWrapper>
      <h1>Log In</h1>
      <FormWrapper onSubmit={handleSubmit(onLoginSubmit)}>
        <CustomInput
          label="Matricula"
          placeholder="Matricula"
          error={errors.matricula?.message}
          register={register("matricula", {
            ...loginFormValidationSchema.matricula,
          })}
        />
                <CustomInput
          label="Password"
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          register={register('password', {
            ...loginFormValidationSchema.password,
          })}
        />
        {formErrorMessage && <LoginError>{formErrorMessage}</LoginError>}
        <CustomButton title="Log In"/>
      </FormWrapper>
    </PageWrapper>
  );
}
