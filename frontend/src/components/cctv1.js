import React from "react";
import "../assets/cctv.css";


const Table1 = ({ apiData }) => {
  
  return (
    <div>
      <table className="table1">
        <thead className="TTH">
          <tr className="ab">
            {apiData &&
              apiData.data &&
              apiData.data.map(
                (room) =>
                  room.roomname !== "SLG" &&
                  room.roomname !== "HYI3" &&
                  room.roomname !== "HYI4" &&
                  room.roomname !== "OFFICE7" &&
                  room.roomname !== "OFFICE6" && (
                    <th key={room.roomname} className="room-name1">
                      {room.roomname}
                    </th>
                  )
              )}
          </tr>
        </thead>
        <tbody>
          <tr className="bb">
            {apiData &&
              apiData.data &&
              apiData.data.map(
                (room) =>
                  room.roomname !== "SLG" &&
                  room.roomname !== "HYI3" &&
                  room.roomname !== "HYI4" &&
                  room.roomname !== "OFFICE7" &&
                  room.roomname !== "OFFICE6" && (
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
                                  className={`status-cell ${
                                    camera.camera === "ON"
                                      ? "status-on"
                                      : "status-off"
                                  }`}
                                  title={camera.ip}
                                  onClick={() =>
                                    window.open(
                                      `http://${camera.ip}`,
                                      "_blank"
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <div>{index + 1}</div> {/* แสดงเลขลำดับ */}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  )
              )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
