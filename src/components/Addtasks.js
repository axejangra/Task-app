import React, { useEffect, useState } from "react";
const URL = process.env.REACT_APP_BACKEND_URL;
function Addtasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [index, setIndex] = useState(null);
    const [status, setStatus] = useState(false);
    const [description, setDescription] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch(URL, { method: "GET" });
        const data = await response.json();
        console.log(URL);
        setTasks(data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        const data = await response.json();
        if (editingTaskId) {
            updateTask(editingTaskId);

            //   const newTasks =  [...tasks]
            //   newTasks.splice(index,1,data)
            //   console.log(data);
            //   setTasks(newTasks)
            //   setTitle('');
            //   setDescription('');
            //   setEditingTaskId(null)
        } else {
            setTasks([...tasks, data]);
            setTitle("");
            setDescription("");
        }
    };

    const deleteTask = async (id) => {
        await fetch(URL+id, {
            method: "DELETE",
        });
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const updateTask = async (id) => {
        const response = await fetch(URL+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        await response.json();

        setTasks(
            tasks.map((task) =>
                task._id === editingTaskId ? { ...task, title, description } : task
            )
        );
        setTitle("");
        setDescription("");
        setEditingTaskId(null);
    };

    const startEditing = (id) => {
        console.log(id);
        const taskToEdit = tasks.find((task) => task._id === id);
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setEditingTaskId(id);
        }
    };
    return (
        <>
            <section className="" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card rounded-3">
                                <div className="card-body p-4">
                                    <h3 className="text-center my-3 pb-3">My Task Manager App</h3>
                                    <form
                                        onSubmit={addTask}
                                        className=" row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                                    >
                                        <div className=" col-12">
                                            <div className="mb-4 form-outline">
                                                <input
                                                    type="text"
                                                    required={true}
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    id="form1"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    required={true}
                                                    placeholder="Description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    id="form2"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4 me-2 col-12">
                                            <button
                                                type="submit"
                                                onClick={(e) => e.preventDefault}
                                                className="btn btn-primary"
                                            >
                                                {editingTaskId ? "Update Task" : "Add Task"}
                                            </button>
                                            <button
                                                type="reset"
                                                onClick={() => {
                                                    setTitle("");
                                                    setDescription("");
                                                    setEditingTaskId(null);
                                                }}
                                                className="btn btn-warning ms-2"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                   

                                    <table className="table mb-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Todo item</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Actions</th>
                                                <th scope="col">Change Status</th>
                                                <th scope="col">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task, index) => (
                                                <tr key={task._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteTask(task._id)}
                                                            className="btn btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                setStatus(!status);
                                                            }}
                                                            className="btn btn-success ms-1"
                                                        >
                                                            {status === false ? "Pending" : "Finished"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => startEditing(task._id)}
                                                            className="btn btn-success ms-1"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Addtasks;
