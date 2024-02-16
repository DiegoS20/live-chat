import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, Grid, TextField } from "@mui/material";

import FormWithImg from "@/components/FormWithImg";
import WhiteLink from "@/components/WhiteLink";

import img from "@/assets/images/login.jpg";
import { login } from "@/services/users";

const Form = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<TLogin> = async (data) => {
    // TODO: Add jwt presistance
    const { email, password } = data;
    const loggedIn = await login(email, password);
    if (!loggedIn) return setError(true);

    navigate("/");
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Grid item lg={12}>
        <TextField
          {...register("email")}
          fullWidth
          required
          type="email"
          placeholder="Email"
        />
      </Grid>
      <Grid item lg={12}>
        <TextField
          {...register("password")}
          fullWidth
          required
          type="password"
          placeholder="Password"
        />
      </Grid>
      <Grid item lg={12}>
        <WhiteLink to="/register">
          You don't have an account? Create one now
        </WhiteLink>
      </Grid>
      <Grid item lg={12}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Grid>
      {error && (
        <Grid item lg={12}>
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(false)}
          >
            Something failed trying to login. Please check your credentials or
            try again later
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default function Login() {
  return (
    <FormWithImg
      bgColor="#E8ECF8"
      imgSrc={img}
      Form={Form}
      title="Welcome back"
    />
  );
}

type TLogin = {
  email: string;
  password: string;
};
