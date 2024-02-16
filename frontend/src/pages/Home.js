import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/cctv.css";
import Table1 from "../components/cctv1";
import Table2 from "../components/cctv2";
import Table3 from "../components/cctv3";

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [webSocketData, setWebSocketData] = useState(null);

  console.log(process.env.REACT_APP_HOST);

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + "/api/ping/check-cctv"
        );
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000); // Refresh every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Connect to WebSocket server
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");

    console.log("WebSocket :", ws);

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    if (ws.readyState === WebSocket.CLOSED) {
      console.log("WebSocket connection closed before it was established");
    }

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setWebSocketData(data);
      // console.log('set :',data)
    };

    if (webSocketData) {
      const ws = new WebSocket("ws://localhost:4000");
      ws.onmessage = handleMessage;

      return () => {
        ws.close();
      };
    }
  }, [webSocketData]);

  function YourComponent() {
    const currentDate = new Date();
    // const thaiOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // const thaiDate = currentDate.toLocaleDateString('th-TH', thaiOptions);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("th-TH", options);

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = currentDate.toLocaleTimeString("th-TH", timeOptions);

    return (
      <div>
        <h1>{formattedDate}</h1>
        <h2>{formattedTime}</h2>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="img-container">
        <img src={require("../assets/jastel.jpg")} alt="Jastel Logo" />
      </div>
      <h2 className="date">
        {" "}
        <YourComponent />{" "}
      </h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h1 className="title">Jastel CCVT Monitor</h1>

      <Table1 apiData={apiData} />
      <Table2 apiData={apiData} />
      <br></br>
      <Table3 apiData2={apiData} />

    </div>
  );
};

export default App;
