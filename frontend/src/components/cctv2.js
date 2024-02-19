// src/components/cctv1.js

import React from "react";
import "../assets/cctv.css";

const Table2 = ({ apiData }) => {
  return (
    <table className="table3">
      <tbody>
        {apiData &&
          apiData.data
            .filter((room) =>
              ["SLG", "HYI3", "HYI4", "OFFICE7", "OFFICE6"].includes(
                room.roomname
              )
            )
            .map((room) => (
              <tr key={room.roomname}>
                <td className="room-name2">{room.roomname}</td>
                <td className="room-status">
                  <table className="table-4">
                    <tbody>
                      <tr>
                        {room.status.map((camera, index) => (
                          <td
                            key={index}
                            className={`status-cell ${
                              camera.camera === "ON"
                                ? "status-on"
                                : "status-off"
                            }`}
                            title={camera.ip}
                            onClick={() =>
                              window.open(`http://${camera.ip}`, "_blank")
                            }
                            style={{ cursor: "pointer" }}
                          >
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
  );
};

export default Table2;
