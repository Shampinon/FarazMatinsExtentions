import { FC } from "react";
import { Box } from "@mui/material";
import { TabProp } from "./type";

type TabPanelProps = {
  children?: React.ReactNode;
  activeItem: TabProp["id"];
  value: TabProp["id"];
};

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, activeItem } = props;

  return (
    value === activeItem && (
      <Box
        sx={{
          pt: 2,
        }}
      >
        {children}
      </Box>
    )
  );
};
