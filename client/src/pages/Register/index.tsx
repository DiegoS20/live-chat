import { useState } from "react";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "@/services/users";
import { TUser } from "@/types";

import FormWithImg from "@/components/FormWithImg";
import WhiteLink from "@/components/WhiteLink";

import img from "@/assets/images/register.svg";

const Form = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TUser>({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<TUser> = async (data) => {
    const registered = await registerService(data);

    if (!registered) return setError(true);

    navigate("/login");
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Grid item lg={6}>
        <TextField
          {...register("name")}
          fullWidth
          required
          id="name"
          placeholder="Your name"
          autoComplete="off"
        />
      </Grid>
      <Grid item lg={6}>
        <TextField
          {...register("last_name")}
          fullWidth
          required
          id="last_name"
          placeholder="Your last name"
          autoComplete="off"
        />
      </Grid>
      <Grid item lg={6}>
        <TextField
          {...register("email")}
          fullWidth
          required
          type="email"
          id="email"
          placeholder="Your personal email"
        />
      </Grid>
      <Grid item lg={6}>
        <TextField
          {...register("password")}
          fullWidth
          required
          type="password"
          id="password"
          placeholder="Password for your user"
        />
      </Grid>
      <Grid item lg={12}>
        <WhiteLink to="/login">Do you already have an account? Login</WhiteLink>
      </Grid>
      <Grid item lg={12}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
        >
          Create account
        </Button>
      </Grid>
      {error && (
        <Grid item lg={12}>
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(false)}
          >
            Something failed trying to sign in. Please try again later
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default function Register() {
  return (
    <FormWithImg imgSrc={img} bgColor="#E8ECF8" Form={Form} title="Sign in" />
  );
}
