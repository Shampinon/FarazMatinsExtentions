import React, { FC } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "./tab-panel";
import { TabProp } from "./type";

type Props = {
  tabs: TabProp[];
  defaultTab?: TabProp["id"];
};

export const TabView: FC<Props> = (props) => {
  const { tabs, defaultTab, ...other } = props;

  const [tab, setTab] = React.useState<TabProp["id"]>(defaultTab ?? tabs[0].id);
  const handleSetTab = (
    event: React.SyntheticEvent,
    newValue: TabProp["id"]
  ) => {
    setTab(newValue);
  };

  return (
    <Box {...other}>
      <Tabs value={tab} onChange={handleSetTab} variant="fullWidth">
        {tabs.map(({ id, label }) => (
          <Tab key={id} label={label} value={id} />
        ))}
      </Tabs>
      <Box>
        {tabs.map(({ id, content }) => (
          <TabPanel key={id} value={id} activeItem={tab}>
            {content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};
