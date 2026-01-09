import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import "../css/assignTask.css";



const AssignTask = () => {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [empId, setEmpId] = useState("");

  const loadEmployees = async () => {
    try {
      const api = `${import.meta.env.VITE_BACK_URL}/admin/empdisplay`;
      const res = await axios.get(api);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const openModal = (id) => {
    setEmpId(id);
    setShow(true);
  };

  const handleInput = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const api = `${import.meta.env.VITE_BACK_URL}/admin/tasksave`;
      const res = await axios.post(api, { id: empId, ...taskData });
      toast.success(res.data.msg);
      setShow(false);
      setTaskData({});
    } catch (err) {
      toast.error("Task assign failed");
    }
  };

  return (
    <div className="assign-page">
      <h2 className="page-title">Assign Task</h2>
      <p className="page-subtitle">
        Assign tasks to employees and manage workload efficiently
      </p>

      <div className="table-card">
        <Table hover responsive className="assign-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Designation</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td className="fw-semibold">{emp.name}</td>
                <td>
                  <Badge bg="primary" pill>
                    {emp.designation}
                  </Badge>
                </td>
                <td>{emp.email}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    className="assign-btn"
                    onClick={() => openModal(emp._id)}
                  >
                    Assign
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="task"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (days)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select name="priority" onChange={handleInput}>
                <option>Select priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignTask;
