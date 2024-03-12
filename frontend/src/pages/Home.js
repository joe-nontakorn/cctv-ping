//home page
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table1 from "../components/cctv1";
import Table2 from "../components/cctv2";
import Table3 from "../components/cctv3";

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [webSocketData, setWebSocketData] = useState(null);
  const [totalCCTV, setTotalIP] = useState(0);
  const [totalOnlineCCTV, setTotalOnlineCCTV] = useState(0);
  const [totalOfflineCCTV, setTotalOfflineCCTV] = useState(0);

  const [totalCCTV2, setTotalIP2] = useState(0);
  const [totalOnlineCCTV2, setTotalOnlineCCTV2] = useState(0);
  const [totalOfflineCCTV2, setTotalOfflineCCTV2] = useState(0);
  


  console.log(process.env.REACT_APP_HOST);

  // Fetch API data
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + "/api/ping/check-cctv"
        );
        
        setApiData(response.data);
  
        
        if (response.data && response.data.data) {
          // นับจำนวน IP ทั้งหมด
          let totalIPCount = 0;
          response.data.data.forEach(room => {
            // ตรวจสอบว่าห้องไม่ใช่ "HBM" ก่อนที่จะนับ
            if (room.roomname !== "HBM") {
              totalIPCount += room.status.length;
            }
          });
          setTotalIP(totalIPCount);
        }


        if (response.data && response.data.data) {
          let totalOnlineCCTV = 0;
          let totalOfflineCCTV = 0;
        
          response.data.data.forEach(room => {
            // ตรวจสอบว่าห้องไม่ใช่ "HBM" ก่อนที่จะนับ
            if (room.roomname !== "HBM") {
              room.status.forEach(camera => {
                if (camera.camera === "ON") {
                  totalOnlineCCTV++;
                } else if (camera.camera === "OFF") {
                  totalOfflineCCTV++;
                }
              });
            }
          });
        
          setTotalOnlineCCTV(totalOnlineCCTV);
          setTotalOfflineCCTV(totalOfflineCCTV);
        }


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();

    const intervalId = setInterval(fetchData1, 2000);

    return () => clearInterval(intervalId);
  }, []);

//components cctv3
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + "/api/ping/check-cctv2"
        );
        setApiData(response.data);
  
        if (response.data && response.data.results && response.data.results.data) {
          let totalIPCount2 = 0;
          Object.values(response.data.results.data).forEach(phase => {
            phase.forEach(room => {
              totalIPCount2++;
            });
          });
          setTotalIP2(totalIPCount2);
  
          let totalOnlineCCTV2 = 0;
          let totalOfflineCCTV2 = 0;
  
          Object.values(response.data.results.data).forEach(phase => {
            phase.forEach(room => {
              if (room.status === "ON") {
                totalOnlineCCTV2++;
              } else {
                totalOfflineCCTV2++;
              }
            });
          });
  
          setTotalOnlineCCTV2(totalOnlineCCTV2);
          setTotalOfflineCCTV2(totalOfflineCCTV2);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData2();
  }, [ setTotalIP2, setTotalOfflineCCTV2, setTotalOnlineCCTV2]);


  const total_ip = totalCCTV + totalCCTV2
  const On_line = totalOnlineCCTV + totalOnlineCCTV2
  const Off_line = totalOfflineCCTV + totalOfflineCCTV2

  




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

      <h1 className="title1">Jastel CCTV Monitor</h1>

      <h2 className="title2">Total : {total_ip}</h2>
      <h2 className="title3">Online : {On_line}</h2>
      <h2 className="title4">Offline : {Off_line}</h2>
      <h2 className="title5">Node center : 69</h2>



      <Table1 apiData={apiData} />
      <Table2 apiData={apiData} />
      <Table3 apiData2={apiData} />
      
    </div>
  );
};

export default App;
