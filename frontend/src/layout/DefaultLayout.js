import React, { useEffect, useState } from "react";
import { useUser } from "../pages/UserContext";
import { Link, useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const { role } = useUser();

  const [roles, getRoles] = useState("");

  useEffect(() => {
    console.log(role);

    if (!role) {
      getRoles(localStorage.getItem("role"));
      console.log(roles);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar text-xl font-medium ">
            <div className="position-sticky">
              <ul className="nav flex-column">
                {role ? (
                  <>
                    {role === "admin" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="/scheduling">
                            Scheduling
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {role === "nurse" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                      </>
                    )}

                    {role === "care-giver" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                      </>
                    )}

                    {role === "staff" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {role === "doctor" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/scheduling">
                            Scheduling
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {role === "Manager" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {roles === "admin" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/scheduling">
                            Scheduling
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {roles === "nurse" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                      </>
                    )}

                    {roles === "staff" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {roles === "doctor" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/scheduling">
                            Scheduling
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}

                    {roles === "care-giver" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/medications">
                            Medications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/CarePlan">
                            CarePlan
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                      </>
                    )}

                    {roles === "Manager" && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/residents">
                            Residents
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/staffs">
                            Staffs
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Reports
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Billing
                          </a>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </nav>

          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
