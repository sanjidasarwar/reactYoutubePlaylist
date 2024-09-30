import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import AllPlaylists from "./AllPlaylists";
import FavouritePlaylist from "./FavouritePlaylist";
import RecentPlaylist from "./RecentPlaylist";
import CustomPlaylists from "./CustomPlaylists";
import { useSelector } from "react-redux";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function HomeTab() {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const [value, setValue] = useState(activeTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
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
          backgroundColor: "#1A1B2F",
          height: "100vh",
          color: "white",
        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "gold",
          },
        }}
      >
        <Tab
          label="All"
          {...a11yProps(0)}
          sx={{
            alignItems: "start",
            "&:hover": {
              backgroundColor: "#38394f",
            },
            "&.Mui-selected": {
              backgroundColor: "#4a4b6a",
              color: "gold",
            },
          }}
        />
        <Tab
          label="Favourites"
          {...a11yProps(1)}
          sx={{
            alignItems: "start",
            "&:hover": {
              backgroundColor: "#38394f",
            },
            "&.Mui-selected": {
              backgroundColor: "#4a4b6a",
              color: "gold",
            },
          }}
        />
        <Tab
          label="Recent"
          {...a11yProps(2)}
          sx={{
            alignItems: "start",
            "&:hover": {
              backgroundColor: "#38394f",
            },
            "&.Mui-selected": {
              backgroundColor: "#4a4b6a",
              color: "gold",
            },
          }}
        />
        <Tab
          label="My Choice"
          {...a11yProps(3)}
          sx={{
            alignItems: "start",
            "&:hover": {
              backgroundColor: "#38394f",
            },
            "&.Mui-selected": {
              backgroundColor: "#4a4b6a",
              color: "gold",
            },
          }}
        />
      </Tabs>
      <Box
        sx={{
          width: { xs: "70%", sm: "80%", md: "85%" },
          backgroundColor: "#2C2C3E",
          padding: 3,
          color: "white",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
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
          <CustomPlaylists />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default HomeTab;
