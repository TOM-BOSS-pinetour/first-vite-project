import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos:v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos:v1", JSON.stringify(todos));
    } catch (e) {
      // ignore storage errors
    }
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = { id: Date.now(), text: trimmed, done: false };
    setTodos((s) => [next, ...s]);
    setText("");
  }

  function toggle(id) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos((s) => s.filter((t) => t.id !== id));
  }

  return (
    <div className="app-root">
      <div className="card">
        <h2 className="card-title">To Do Lists</h2>

        <form onSubmit={addTodo} className="input-row">
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add todo"
            aria-label="New todo"
          />
          <button className="btn primary" type="submit">
            Add
          </button>
        </form>

        <ul className="todo-list">
          {todos.length === 0 && <li className="empty">No todos</li>}
          {todos.map((t) => (
            <li key={t.id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  aria-label={`Mark ${t.text}`}
                />
                <span className={`todo-text ${t.done ? "done" : ""}`}>
                  {t.text}
                </span>
              </label>
              <button
                className="btn danger"
                onClick={() => remove(t.id)}
                aria-label={`Delete ${t.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
