import { useState } from "react";
import "./App.css";
import Task from "./components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "use-local-storage";

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  //const [tasks, setTasks] = useState([]);
  const [tasks,setTasks] = useLocalStorage("tasks",[]);
  const [taskID, setTaskID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((!name && !date) || !name || !date) {
      toast.error("Please enter the task");
    } else if (name && date && isEditing) {
      setTasks(
        tasks.map((item) => {
          if (item.id === taskID) {
            return { ...tasks, name: name, date: date, complete: false };
          }
          return item;
        })
      );
      setName("");
      setDate("");
      setIsEditing(false);
      setTaskID(null);
    } else {
      let newTask = {
        id: Date.now(),
        name: name,
        date: date,
        complete: false,
      };

      setTasks([...tasks, newTask]);
      setName("");
      setDate("");
    }
  };

  const editTask = (id) => {
    const resetItem = tasks.find((item) => item.id === id);
    setIsEditing(true);
    setTaskID(id);

    setName(resetItem.name);
    setDate(resetItem.date);
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this Task") === true) {
      const newTasks = tasks.filter((item) => item.id !== id);

      setTasks(newTasks);
    }
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) => {
        if(item.id === id){
          return {...item,complete:true}
        }
        return item;
      })
    )
  }

  return (
    <div className="App">
      <div className="main-task-container">
        <div className="input-wrapper">
          <h1 style={{ textAlign: "center" }}>Task Manager</h1>
          {/* input form */}
          <form className="form-container" onSubmit={handleSubmit}>
            {/* New Task */}
            <span>
              <label htmlFor="task">Task:- </label>
              <input
                type="text"
                placeholder="Enter the new task"
                id="task"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>

            {/* Date of that task */}
            <span>
              <label htmlFor="date">Date:- </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </span>

            {/* button to save the task */}
            <span>
              <button>{isEditing ? "Edit Task" : "Save Task"}</button>
            </span>
          </form>
        </div>

        <h4
          style={{
            fontSize: "30px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          Tasks to be completed
        </h4>

        <div className="horizontal-line"></div>

        <div className="task-wrapper">
          {tasks.length === 0 ? (
            <h2>No Task Available</h2>
          ) : (
            tasks.map((item) => {
              return (
                <Task {...item} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask}/>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
