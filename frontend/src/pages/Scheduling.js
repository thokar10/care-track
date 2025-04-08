import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { message } from "antd";
import { MdDelete } from "react-icons/md";
import { useUser } from "./UserContext";

const Scheduling = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/task/get")
      .then((response) => setTask(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/getByID/${id}`);
      setTask(task.filter((med) => med._id !== id));
      message.success("Task deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to delete Task.");
    }
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="residents-container">
        <h1 className="text-gray-600 font-bold text-center">Scheduling</h1>
        <Link to="/add-schedule" className="add-resident-link hover:scale-105">
          Schedule New Task
        </Link>

        <table className="medications-table">
          <thead>
            <tr>
              <th>Assign Staff Name</th>
              <th>Resident Name</th>
              <th>Room</th>
              <th>Task</th>
              <th>Time and Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((task) => (
              <tr key={task._id}>
                <td>{task.staffId.name}</td>
                <td> {task.residentId.name} </td>
                <td>{task.residentId.roomNumber}</td>
                <td>{task.taskTitle}</td>
                <td>{formatDateTime(task.dateTime)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger hover:scale-105"
                    style={{ marginLeft: "15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <MdDelete /> delete
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default Scheduling;
