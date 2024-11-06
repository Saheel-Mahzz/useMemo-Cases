import React, { useMemo, useState } from "react";

const Lists = () => {
  const [value, setValue] = useState("");
  const [lists, setLists] = useState([]);
  const [filter, setFilter] = useState("All");

  //can try updating the number using setNumber. The component re-renders but the function defined with useMemo won't run .
  //useMemo runs only when the dependency value changes ...avoiding unnecessary re-calculation
  // const [number, setNumber] = useState(0);

  // Function to handle adding a new task when the Enter key is pressed
  const handleKeyDown = (e) => {
    // Only add the task if the Enter key is pressed and the value is not empty
    if (e.key == "Enter" && value.trim()) {
      const newTask = {
        id: Date.now(), // Using current timestamp as a unique id
        text: value,
        isCompleted: false,
      };
      // Add the new task to the list
      setLists((prev) => [...prev, newTask]);
      //Clear Input
      setValue("");
    }
  };

  // useMemo hook to filter the task list based on the current filter ('All', 'Completed', 'Active')
  const filterLists = useMemo(() => {
    switch (filter) {
      case "Completed":
        return lists.filter((list) => list.isCompleted); // Only return completed tasks
      case "Active":
        return lists.filter((list) => !list.isCompleted); // Only return active tasks
      default:
        return lists;
    }
  }, [lists, filter]); //Recompute the filtered list when 'lists' or 'filter' changes

  const handleToggle = (id) => {
    console.log("this is toggle", id);
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, isCompleted: !list.isCompleted } : list
      )
    );
  };

  const handleRemove = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };
  console.log("This is the lists", lists);
  return (
    <div className="container">
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter a task.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <ul className="filters">
          <li
            onClick={() => setFilter("All")}
            className={`${filter === "All" ? "list-selected" : ""}`}
          >
            All
          </li>
          <li
            onClick={() => setFilter("Completed")}
            className={`${filter === "Completed" ? "list-selected" : ""}`}
          >
            Completed
          </li>
          <li
            onClick={() => setFilter("Active")}
            className={`${filter === "Active" ? "list-selected" : ""}`}
          >
            Active
          </li>
        </ul>

        {filterLists.length > 0 && (
          <ul className="task-box">
            {filterLists.map((list) => (
              <li key={list.id}>
                <input type="checkbox" onClick={() => handleToggle(list.id)} />
                {list.text}
                <button onClick={() => handleRemove(list.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <p>Number : {number}</p>
      <button onClick={() => setNumber(number + 1)}>Add Number</button> */}
    </div>
  );
};

export default Lists;
