import React from "react";
import { Container } from "@mui/material";
import { TabView, TabProp } from "./components/tab-view";
import { Home } from "./modules/home";
import { Logs } from "./modules/logs";
import { AuthUser } from "./components/auth-user";

const tabs: TabProp[] = [
  {
    id: "home",
    label: "Home",
    content: <Home />,
  },
  {
    id: "logs",
    label: "Logs",
    content: <Logs />,
  },
];

export const Popup = () => {
  return (
    <Container sx={{ pb: 2 }}>
      <AuthUser>
        <TabView tabs={tabs} defaultTab="home" />
      </AuthUser>
    </Container>
  );
};
