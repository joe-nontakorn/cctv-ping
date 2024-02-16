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
  }, []);

  const calculatePageNumber = (index) => {
    return Math.floor(index / data.data.length) + 1;
  };

  return (
    <div>
      <table className="table5">
        <thead>
          <tr>
            {data &&
              data.data.map((item) => (
                <th key={item.id} style={{ writingMode: "vertical-lr" }}>
                  {item.name}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data &&
              data.data.map((item, index) => (
                <td
                  key={item.id}
                  className={`block-frame ${
                    item.status === "ON" ? "status-on" : "status-off"
                  }`}
                  title={item.ip}
                  onClick={() => window.open(`http://${item.ip}`, "_blank")}
                  style={{ cursor: "pointer" }}
                >
                  <table className="inner-table">
                    <tbody>
                      <tr>
                       <div>{calculatePageNumber(index)}</div>
                      </tr>
                    </tbody>
                  </table>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table3;
