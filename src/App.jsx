import { useEffect } from "react";
import "./App.css";
import getPlayList from "./api";

function App() {
  useEffect(() => {
    getPlayList("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl").then((res) =>
      console.log(res)
    );
  });

  return <></>;
}

export default App;
