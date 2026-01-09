import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Badge } from "react-bootstrap";
import "../css/adminreport.css";

const Report = () => {
    const [reports, setReports] = useState([]);

    const loadData = async () => {
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/admin/taskreportdisplay`;
            const res = await axios.get(api);
            setReports(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const taskReassign = async (id) => {
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/admin/taskreassign/?id=${id}`;
            const res = await axios.get(api);
            alert(res.data.msg);
            loadData();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="report-page">
            <h2 className="page-title">Task Reports</h2>
            <p className="page-subtitle">
                Track employee task progress, priorities, and performance
            </p>

            <div className="report-card">
                <Table hover responsive className="report-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Priority</th>
                            <th>Days Taken</th>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className="fw-semibold">{item.task}</td>
                                <td>{item.duration} days</td>

                                <td>
                                    <Badge bg={
                                        item.priority === "High"
                                            ? "danger"
                                            : item.priority === "Medium"
                                                ? "warning"
                                                : "success"
                                    }>
                                        {item.priority}
                                    </Badge>
                                </td>

                                <td>{item.completionday}</td>
                                <td>{item.empid.name}</td>
                                <td>{item.empid.email}</td>

                                <td>
                                    <Badge bg="info">{item.empid.designation}</Badge>
                                </td>

                                <td>
                                    <Badge bg={
                                        item.taskstatus === "Completed"
                                            ? "success"
                                            : item.taskstatus === "Pending"
                                                ? "secondary"
                                                : "primary"
                                    }>
                                        {item.taskstatus}
                                    </Badge>
                                </td>

                                <td className="text-center">
                                    <Button
                                        size="sm"
                                        className="reassign-btn"
                                        onClick={() => taskReassign(item._id)}
                                    >
                                        Re-Assign
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Report;
