import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/cctv.css';

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [webSocketData, setWebSocketData] = useState(null);

  console.log(process.env.REACT_APP_HOST);

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_HOST + '/api/ping/check-cctv');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000); // Refresh every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, []);


  // Connect to WebSocket server
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    console.log('WebSocket :', ws);

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    if (ws.readyState === WebSocket.CLOSED) {
      console.log('WebSocket connection closed before it was established');
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
      const ws = new WebSocket('ws://localhost:4000');
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
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('th-TH', options);


    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = currentDate.toLocaleTimeString('th-TH', timeOptions);


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
        <img src={require('../assets/jastel.jpg')} alt="Jastel Logo" />
      </div>      <h2 className='date'> <YourComponent /> </h2>
      <br></br>
      <h1 className='title'>Jastel CCVT Monitor</h1>
      <table className="table1">
        <thead className='TTH'>
          <tr className='ab'>
            {apiData && apiData.data.map(room => (
              room.roomname !== "SLG" &&
              room.roomname !== "HYI3" &&
              room.roomname !== "HYI4" &&
              room.roomname !== "OFFICE7" &&
              room.roomname !== "OFFICE6" &&

              <th key={room.roomname} className="room-name1">{room.roomname}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className='bb'>
            {apiData && apiData.data.map(room => (
              room.roomname !== "SLG" &&
              room.roomname !== "HYI3" &&
              room.roomname !== "HYI4" &&
              room.roomname !== "OFFICE7" &&
              room.roomname !== "OFFICE6" &&

              <td key={room.roomname}>
                {room.roomname === "HBM" ? (
                  <table className="table2">
                    <tbody>
                      <tr>
                        <td>-</td>

                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="table2">
                    <tbody>
                      {room.status.map((camera, index) => (
                        <tr key={index}>
                          <td
                            className={`status-cell ${camera.camera === 'ON' ? 'status-on' : 'status-off'}`}
                            title={camera.ip}
                            onClick={() => window.open(`http://${camera.ip}`, '_blank')}
                            style={{ cursor: 'pointer' }}
                          >
                            <div>{index + 1}</div> {/* แสดงเลขลำดับ */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </td>

            ))}
          </tr>
        </tbody>
      </table>




      <table className='table3'>
        <tbody>
          {apiData && apiData.data
            .filter(room => ["SLG", "HYI3", "HYI4", "OFFICE7", "OFFICE6"].includes(room.roomname))
            .map(room => (
              <tr key={room.roomname}>
                <td className="room-name2">{room.roomname}</td>
                <td className="room-status">

                  <table className="table-4">
                    <tbody>
                      <tr>
                        {room.status.map((camera, index) => (
                          <td key={index}
                            className={`status-cell ${camera.camera === 'ON' ? 'status-on' : 'status-off'}`}
                            title={camera.ip}
                            onClick={() => window.open(`http://${camera.ip}`, '_blank')}
                            style={{ cursor: 'pointer' }}>

                            <div>{index + 1}</div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>



                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );

};

export default App;
