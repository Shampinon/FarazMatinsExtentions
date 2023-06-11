import React, { FC } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useFormik } from "formik";

export const Home: FC = () => {
  const formik = useFormik({
    initialValues: {
      channelId: "",
      memberId: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Channel ID"
          name="channelId"
          onChange={formik.handleChange}
          value={formik.values.channelId}
          autoComplete="channelId"
        />
        <TextField
          label="Member ID"
          name="memberId"
          onChange={formik.handleChange}
          value={formik.values.memberId}
          autoComplete="memberId"
        />
        <Button type="submit">Start</Button>
      </Stack>
    </form>
  );
};
