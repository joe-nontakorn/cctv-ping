//components table3
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/table3.css";

const Table3 = () => {
  const [data, setApiData] = useState(null);
  // const [totalCCTV2, setTotalIP2] = useState(0);
  // const [totalOnlineCCTV2, setTotalOnlineCCTV2] = useState(0);
  // const [totalOfflineCCTV2, setTotalOfflineCCTV2] = useState(0);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + "/api/ping/check-cctv2"
        );
        setApiData(response.data);

        // if (response.data && response.data.results && response.data.results.data) {
        //   let totalIPCount2 = 0;
        //   Object.values(response.data.results.data).forEach(phase => {
        //     phase.forEach(room => {
        //       totalIPCount2++;
        //     });
        //   });
        //   setTotalIP2(totalIPCount2);

        //   let totalOnlineCCTV2 = 0;
        //   let totalOfflineCCTV2 = 0;

        //   Object.values(response.data.results.data).forEach(phase => {
        //     phase.forEach(room => {
        //       if (room.status === "ON") {
        //         totalOnlineCCTV2++;
        //       } else {
        //         totalOfflineCCTV2++;
        //       }
        //     });
        //   });

        //   setTotalOnlineCCTV2(totalOnlineCCTV2);
        //   setTotalOfflineCCTV2(totalOfflineCCTV2);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData2();
  }, []);

  // Render data in a table format
  return (
    <div>
      
      <br></br>
      <h1 className="IDC" aria-label="Description of the Heading"> </h1>
      {/* <h1 className="IDC1">Node IDC</h1> */}

      <div className="container">
        <table className="phase1">
          <caption className="caption-text">IDC Phase 1</caption>
          <thead>
            {data && data.results && (
              <tr>
                {data.results.data.phase1.map((item, index) => (
                  <th key={index} className="vertical-header">
                    {item.name}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data && data.results && (
              <tr>
                {data.results.data.phase1.map((item, index) => (
                  <td
                    className={`status-cell ${
                      item.status === "ON" ? "status-on" : "status-off"
                    }`}
                    title={item.ip}
                    onClick={() => window.open(`http://${item.ip}`, "_blank")}
                    style={{ cursor: "pointer" }}
                  >
                    <div>{index + 1}</div> {/* แสดงเลขลำดับ */}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>

        <table className="phase2">
          <caption className="caption-text">IDC Phase 2</caption>
          <thead>
            {data && data.results && (
              <tr>
                {data.results.data.phase2.map((item, index) => (
                  <th key={index} className="vertical-header">
                    {item.name}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data && data.results && (
              <tr>
                {data.results.data.phase2.map((item, index) => (
                  <td
                    className={`status-cell ${
                      item.status === "ON" ? "status-on" : "status-off"
                    }`}
                    title={item.ip}
                    onClick={() => window.open(`http://${item.ip}`, "_blank")}
                    style={{ cursor: "pointer" }}
                  >
                    <div>{index + 1}</div> {/* แสดงเลขลำดับ */}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>

        <table className="phase3">
          <caption className="caption-text">IDC Phase 3</caption>
          <thead>
            {data && data.results && (
              <tr>
                {data.results.data.phase3.map((item, index) => (
                  <th key={index} className="vertical-header">
                    {item.name}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data && data.results && (
              <tr>
                {data.results.data.phase3.map((item, index) => (
                  <td
                    className={`status-cell ${
                      item.status === "ON" ? "status-on" : "status-off"
                    }`}
                    title={item.ip}
                    onClick={() => window.open(`http://${item.ip}`, "_blank")}
                    style={{ cursor: "pointer" }}
                  >
                    <div>{index + 1}</div> {/* แสดงเลขลำดับ */}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table3;
