import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/table3.css";

const Table3 = ({ apiData2 }) => {
  const [data, setApiData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + "/api/ping/check-cctv2"
        );
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiData2]);

  // Render data in a table format
  return (
    <div className="container">
      <table className="phase1">
      <caption className="caption-text">Phase 1</caption>
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
      <caption className="caption-text">Phase 2</caption>
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
      <caption className="caption-text">Phase 3</caption>
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
  );
};

export default Table3;
