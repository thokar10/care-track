import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import axios from "axios";
import { useUser } from "./UserContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { setUser, setRole, role } = useUser();

  const [residentCount, setResidentCounts] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [residents, setResidents] = useState([]);
  const [tasks, setTask] = useState([]);

  const navigate = useNavigate();

  const getRoles = async () => {
    const id = localStorage.getItem("staffID");
    try {
      const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
      setRole(response.data.role);
      localStorage.setItem("role", response.data.role);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to get role");
    }
  };

  const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    }
    axios
      .get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setResidentCounts(data.residentCount);
        setStaffCount(data.staffCount);
        setTaskCount(data.taskCount);
        setTask(data.tasks);
        setUser(data.staffID);
        localStorage.setItem("staffID", data.staffID);
        setResidents(data.residents);
      })
      .catch((error) => console.error(error));

    setTimeout(() => {
      getRoles();
    }, 1000);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  if (!residentCount) {
    return <div>Loading...</div>;
  }

  const getBadgeColor = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    if (hour < 12) {
      return "warning";
    } else if (hour >= 12 && hour < 17) {
      return "danger";
    } else {
      return "success";
    }
  };

  const pendingTasks = tasks.filter((task) => task.status === "pending");

  // Function to get the start of the current week
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  };

  // Function to get the end of the current week
  const getEndOfWeek = (date) => {
    const end = new Date(date);
    end.setDate(date.getDate() + (6 - date.getDay()));
    return end;
  };

  // Get the current date
  const currentDate = new Date();

  // Filter tasks for the current week
  const startOfWeek = getStartOfWeek(currentDate);
  const endOfWeek = getEndOfWeek(currentDate);

  // Group tasks by day
  const weeklyTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dateTime);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  const groupedTasks = weeklyTasks.reduce((acc, task) => {
    const day = new Date(task.dateTime).toDateString();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(task);
    return acc;
  }, {});

  return (
    <DefaultLayout>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 text-gray-600 font-[Montserrat] ">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2" style={{ fontWeight: "700" }}>
            Dashboard Overview
          </h1>
          <div className="btn-toolbar mb-2 mb-md-0 gap-2">
            <button className="btn btn-sm btn-outline-secondary">{role}</button>
            <button className="btn btn-sm btn-outline-secondary">Help</button>
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("staffID");
                message.success("sign Out successfully");

                setTimeout(() => {
                  navigate("/login");
                }, 1000);
              }}
            >
              SignOut
            </button>
          </div>
        </div>

        {role === "admin" && (
          <>
            <div className="row text-center mb-4 ">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Total Residents</h5>
                    <h2>{residentCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Staff Members</h5>
                    <h2>{staffCount}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Open Tasks</h5>
                    <h2>{taskCount}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Resident Status
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Room</th>
                          <th>Care Plan</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {residents.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.roomNumber}</td>
                            <td>{item.carePlan}</td>
                            <td>{item.age}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Upcoming Tasks
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {pendingTasks.map((item) => {
                        const dateTime = new Date(item.dateTime);
                        const options = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        };
                        const time = dateTime.toLocaleTimeString([], options);

                        return (
                          <li key={item._id} className="list-group-item">
                            {item.taskTitle} - Room {item.residentId.roomNumber}
                            <span
                              className={`badge bg-${getBadgeColor(
                                time
                              )} float-end`}
                            >
                              {time}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">Calendar</div>
                  <div className="card-body">
                    {Object.keys(groupedTasks).map((day) => (
                      <div key={day} className="mb-3">
                        <h4 className="text-gray-600 font-bold">{day}</h4>
                        <ul className="list-group">
                          {groupedTasks[day].map((task) => {
                            const dateTime = new Date(task.dateTime);
                            const options = {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            };
                            const time = dateTime.toLocaleTimeString(
                              [],
                              options
                            );
                            return (
                              <li key={task._id} className="list-group-item">
                                {task.taskTitle} - Room{" "}
                                {task.residentId.roomNumber} at {time}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">
                    Recent Notifications
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Medication adjustment for Zayn Ween (Room 101A)
                        <span className="text-muted float-end">1 hour ago</span>
                      </li>
                      <li className="list-group-item">
                        Robin Keke (Room 102A) requires immediate assistance
                        <span className="text-muted float-end">
                          4 hours ago
                        </span>
                      </li>
                      <li className="list-group-item">
                        Family visit scheduled for Mary Smith (Room 103A)
                        <span className="text-muted float-end">30 min ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {role === "nurse" && (
          <>
            <div className="row text-center mb-4 ">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Total Residents</h5>
                    <h2>{residentCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Open Tasks</h5>
                    <h2>{taskCount}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Resident Status
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Room</th>
                          <th>Care Plan</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {residents.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.roomNumber}</td>
                            <td>{item.carePlan}</td>
                            <td>{item.age}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Upcoming Tasks
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {pendingTasks.map((item) => {
                        const dateTime = new Date(item.dateTime);
                        const options = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        };
                        const time = dateTime.toLocaleTimeString([], options);

                        return (
                          <li key={item._id} className="list-group-item">
                            {item.taskTitle} - Room {item.residentId.roomNumber}
                            <span
                              className={`badge bg-${getBadgeColor(
                                time
                              )} float-end`}
                            >
                              {time}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">Calendar</div>
                  <div className="card-body">
                    {Object.keys(groupedTasks).map((day) => (
                      <div key={day} className="mb-3">
                        <h4 className="text-gray-600 font-bold">{day}</h4>
                        <ul className="list-group">
                          {groupedTasks[day].map((task) => {
                            const dateTime = new Date(task.dateTime);
                            const options = {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            };
                            const time = dateTime.toLocaleTimeString(
                              [],
                              options
                            );
                            return (
                              <li key={task._id} className="list-group-item">
                                {task.taskTitle} - Room{" "}
                                {task.residentId.roomNumber} at {time}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">
                    Recent Notifications
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Medication adjustment for Zayn Ween (Room 101A)
                        <span className="text-muted float-end">1 hour ago</span>
                      </li>
                      <li className="list-group-item">
                        Robin Keke (Room 102A) requires immediate assistance
                        <span className="text-muted float-end">
                          4 hours ago
                        </span>
                      </li>
                      <li className="list-group-item">
                        Family visit scheduled for Mary Smith (Room 103A)
                        <span className="text-muted float-end">30 min ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {role === "doctor" && (
          <>
            <div className="row text-center mb-4 ">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Total Residents</h5>
                    <h2>{residentCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Open Tasks</h5>
                    <h2>{taskCount}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Resident Status
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Room</th>
                          <th>Care Plan</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {residents.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.roomNumber}</td>
                            <td>{item.carePlan}</td>
                            <td>{item.age}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Upcoming Tasks
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {pendingTasks.map((item) => {
                        const dateTime = new Date(item.dateTime);
                        const options = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        };
                        const time = dateTime.toLocaleTimeString([], options);

                        return (
                          <li key={item._id} className="list-group-item">
                            {item.taskTitle} - Room {item.residentId.roomNumber}
                            <span
                              className={`badge bg-${getBadgeColor(
                                time
                              )} float-end`}
                            >
                              {time}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">Calendar</div>
                  <div className="card-body">
                    {Object.keys(groupedTasks).map((day) => (
                      <div key={day} className="mb-3">
                        <h4 className="text-gray-600 font-bold">{day}</h4>
                        <ul className="list-group">
                          {groupedTasks[day].map((task) => {
                            const dateTime = new Date(task.dateTime);
                            const options = {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            };
                            const time = dateTime.toLocaleTimeString(
                              [],
                              options
                            );
                            return (
                              <li key={task._id} className="list-group-item">
                                {task.taskTitle} - Room{" "}
                                {task.residentId.roomNumber} at {time}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">
                    Recent Notifications
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Medication adjustment for Zayn Ween (Room 101A)
                        <span className="text-muted float-end">1 hour ago</span>
                      </li>
                      <li className="list-group-item">
                        Robin Keke (Room 102A) requires immediate assistance
                        <span className="text-muted float-end">
                          4 hours ago
                        </span>
                      </li>
                      <li className="list-group-item">
                        Family visit scheduled for Mary Smith (Room 103A)
                        <span className="text-muted float-end">30 min ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {role === "staff" && (
          <>
            <div className="row text-center mb-4 ">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Total Residents</h5>
                    <h2>{residentCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-semibold">Open Tasks</h5>
                    <h2>{taskCount}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Resident Status
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Room</th>
                          <th>Care Plan</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {residents.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.roomNumber}</td>
                            <td>{item.carePlan}</td>
                            <td>{item.age}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header font-semibold">
                    Upcoming Tasks
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {pendingTasks.map((item) => {
                        const dateTime = new Date(item.dateTime);
                        const options = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        };
                        const time = dateTime.toLocaleTimeString([], options);

                        return (
                          <li key={item._id} className="list-group-item">
                            {item.taskTitle} - Room {item.residentId.roomNumber}
                            <span
                              className={`badge bg-${getBadgeColor(
                                time
                              )} float-end`}
                            >
                              {time}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">Calendar</div>
                  <div className="card-body">
                    {Object.keys(groupedTasks).map((day) => (
                      <div key={day} className="mb-3">
                        <h4 className="text-gray-600 font-bold">{day}</h4>
                        <ul className="list-group">
                          {groupedTasks[day].map((task) => {
                            const dateTime = new Date(task.dateTime);
                            const options = {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            };
                            const time = dateTime.toLocaleTimeString(
                              [],
                              options
                            );
                            return (
                              <li key={task._id} className="list-group-item">
                                {task.taskTitle} - Room{" "}
                                {task.residentId.roomNumber} at {time}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header font-semibold">
                    Recent Notifications
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Medication adjustment for Zayn Ween (Room 101A)
                        <span className="text-muted float-end">1 hour ago</span>
                      </li>
                      <li className="list-group-item">
                        Robin Keke (Room 102A) requires immediate assistance
                        <span className="text-muted float-end">
                          4 hours ago
                        </span>
                      </li>
                      <li className="list-group-item">
                        Family visit scheduled for Mary Smith (Room 103A)
                        <span className="text-muted float-end">30 min ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </DefaultLayout>
  );
};

export default Dashboard;
