import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import Box from "@mui/material/Box";
import { useState } from "react";
import AllPlaylists from "./AllPlaylists";
import FavouritePlaylist from "./FavouritePlaylist";
import RecentPlaylist from "./RecentPlaylist";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function HomeTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "15%",
        }}
      >
        <Tab label="All" {...a11yProps(0)} sx={{ alignItems: "start" }} />
        <Tab
          label="Favourites"
          {...a11yProps(1)}
          sx={{ alignItems: "start" }}
        />
        <Tab label="Recent" {...a11yProps(2)} sx={{ alignItems: "start" }} />
        <Tab label="My Choice" {...a11yProps(3)} sx={{ alignItems: "start" }} />
      </Tabs>
      <Box sx={{ width: "85%" }}>
        <TabPanel value={value} index={0}>
          <AllPlaylists />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavouritePlaylist />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RecentPlaylist />
        </TabPanel>
        <TabPanel value={value} index={3}>
          My Choice
        </TabPanel>
      </Box>
    </Box>
  );
}

export default HomeTab;
