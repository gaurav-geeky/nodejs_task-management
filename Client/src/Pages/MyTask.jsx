import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../css/mytask.css";

const MyTask = () => {
  const [mydata, setMyData] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
      const response = await axios.get(api);
      setMyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = mydata.filter((each) =>
    each.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="emp-task-header">
        <h1 className="emp-title">My Task Details</h1>
      </div>

      <div className="emp-table-container">
        <Table bordered hover className="emp-task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Detail</th>
              <th>Duration (Days)</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.task}</td>
                <td>{task.duration}</td>
                <td>
                  <span
                    className={`priority-tag ${
                      task.priority.toLowerCase()
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MyTask;
