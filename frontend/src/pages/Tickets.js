import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tickets.css";

const Tickets = ({ env }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const apiUrl =
    env === "dev" ? "/api/dev/tickets" : "/api/prod/tickets";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setTasks(response.data.tasks);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setError("Unable to load tickets. Please check the backend.");
      });
  }, [apiUrl]);

  return (
    <div className="tickets-container">
      <h1>{env.toUpperCase()} Tickets</h1>

      {error && <p role="alert">{error}</p>}

      <div className="task-container">
        <div className="column completed">
          <h2>Completed Tickets</h2>
          <ul>
            {tasks.filter((task) => task.completed).map((task, index) => (
              <li key={index} className="task-item">
                {task.title} ({task.description})
                <br />
                <span className="created-at">
                  Created At: {task.created_at}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="column pending">
          <h2>Pending Tickets</h2>
          <ul>
            {tasks.filter((task) => !task.completed).map((task, index) => (
              <li key={index} className="task-item">
                {task.title} ({task.description})
                <br />
                <span className="created-at">
                  Created At: {task.created_at}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
