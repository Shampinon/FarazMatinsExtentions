import React from "react";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";

const useToken = () => {
  const [isPending, setPendingStatus] = React.useState<boolean>(false);
  const [isLoading, setLoadingStatus] = React.useState<boolean>(true);
  const [token, setToken] = React.useState<string>();

  React.useEffect(() => {
    chrome.storage.sync.get(["token"]).then((result) => {
      setToken(result.token);
      setLoadingStatus(false);
    });
  });

  const saveToken = (token: string) => {
    setPendingStatus(true);

    chrome.storage.sync.set({ token }).then(() => {
      setToken(token);
      setPendingStatus(false);
    });
  };

  return {
    isLoading,
    isPending,
    token,
    saveToken,
  };
};

export const useAuthUser = () => {
  const { token, saveToken, isPending, isLoading } = useToken();
  const tokenFieldRef = React.useRef<HTMLInputElement>();

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit: async (values) => {
      saveToken(values.token);
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("token", token);
  }, [token]);

  const generateToken = () => {
    formik.setFieldValue("token", uuid());
    tokenFieldRef.current.focus();
  };

  return {
    isAuthorized: !!token,
    generateToken,
    formik,
    isPending,
    isLoading,
    tokenFieldRef,
  };
};
