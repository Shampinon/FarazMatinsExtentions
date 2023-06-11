import React, { FC } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useAuthUser } from "./use-auth-user";

type Props = {
  children: React.ReactNode;
};

export const AuthUser: FC<Props> = (props) => {
  const {
    isAuthorized,
    formik,
    isLoading,
    isPending,
    tokenFieldRef,
    generateToken,
  } = useAuthUser();

  if (isAuthorized) {
    return <>{props.children}</>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ pt: 2, w: 700 }}>
        <Button onClick={generateToken}>Get new Token</Button>
        <TextField
          label="Token"
          name="token"
          onChange={formik.handleChange}
          value={formik.values.token}
          autoComplete="token"
          inputRef={tokenFieldRef}
        />
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </Stack>
    </form>
  );
};
