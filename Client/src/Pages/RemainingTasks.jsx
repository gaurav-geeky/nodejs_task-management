import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../css/remainingtask.css";
import { ToastContainer, toast } from "react-toastify";

const RemainingTasks = () => {
  const [mydata, setMyData] = useState([]);
  const [show, setShow] = useState(false);

  const [taskstatus, setTaskStatus] = useState("");
  const [taskduration, setTaskDuration] = useState("");
  const [taskId, setTaskId] = useState("");

  const [search, setSearch] = useState("");


  const handleClose = () => setShow(false);
  
  const handleShow = (tid) => {
    setTaskId(tid);
    setShow(true);
  };

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

  const taskReportSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/employee/taskreport`;
      const response = await axios.put(api, {
        taskstatus,
        taskduration,
        taskId,
      });
      toast.success(response.data.msg);
      setShow(false);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const searchdata = search.trim() === "" ?
    mydata :
    mydata.filter((each) =>
      each.task.toLowerCase().includes(search.toLowerCase())
    );

  let ans = searchdata
    .filter((task) => !task.submitstatus)
    .map((task, index) => (
      <tr key={task._id}>
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
        <td>
          <button
            className="send-report-btn"
            onClick={() => handleShow(task._id)}
          >
            Send Report
          </button>
        </td>
      </tr>
    ))

  return (
    <>
      {/* Header Card */}
      <div className="remaining-header">
        <div>
          <h1 className="remaining-title">Remaining Tasks</h1>
          <p className="remaining-subtitle">
            Tasks you still need to complete and submit ⏳
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="w-72 px-2 py-2 border mx-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="text"
            placeholder="Search text ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* Table */}
      <div className="remaining-table-container">
        <Table hover className="remaining-task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Detail</th>
              <th>Duration (Days)</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {ans}
          </tbody>
        </Table>
      </div>


      {/* Report Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Task Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={taskstatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option>Select Status</option>
                <option value="FullyCompleted">Fully Completed</option>
                <option value="PartialCompleted">Partial Completed</option>
                <option value="NoCompleted">Not Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Completion Days</Form.Label>
              <Form.Control
                type="number"
                value={taskduration}
                onChange={(e) => setTaskDuration(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={taskReportSubmit}>
              Submit Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default RemainingTasks;
