import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../css/submittedtask.css";

const SubmittedTask = () => {
  const [mydata, setMyData] = useState([]);

  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/employee/showtask/?id=${localStorage.getItem(
        "empid"
      )}`;
      const response = await axios.get(api);
      setMyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {/* Header Card */}
      <div className="submitted-header">
        <h1 className="submitted-title">Submitted Tasks</h1>
        <p className="submitted-subtitle">
          These are the tasks you have already completed and submitted ✔️
        </p>
      </div>

      {/* Data Table */}
      <div className="submitted-table-container">
        <Table hover className="submitted-task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Duration (Days)</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {mydata
              .filter((item) => item.submitstatus)
              .map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>{task.duration}</td>
                  <td>
                    <span
                      className={`priority-tag ${task.priority.toLowerCase()}`}
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

export default SubmittedTask;
