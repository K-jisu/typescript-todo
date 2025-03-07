import { useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type handleRemove = (id: Todo["id"]) => void;
type toggleTodo = ({ id, completed }: Omit<Todo, "title">) => void;

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let titleName = e.target.value;
    setTitle(titleName);
  };

  const handleAddTodo = () => {
    if (title === "") return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
  };

  const handleRemove: handleRemove = (id) => {
    const filteredTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodo);
  };

  const handleToggleTodo: toggleTodo = ({ id, completed }) => {
    let toggledTodo = todoList.map((todo) => {
      return todo.id === id ? { ...todo, completed: !completed } : todo;
    });
    setTodoList(toggledTodo);
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          handleTitle(e);
        }}
      />
      <button onClick={handleAddTodo}>등록</button>
      <TodoList
        todoList={todoList}
        handleRemove={handleRemove}
        handleToggleTodo={handleToggleTodo}
      />
    </>
  );
}

type TodoList = {
  todoList: Todo[];
  handleRemove: handleRemove;
  handleToggleTodo: toggleTodo;
};

const TodoList = ({ todoList, handleRemove, handleToggleTodo }: TodoList) => {
  return (
    <>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handleRemove={handleRemove}
          handleToggleTodo={handleToggleTodo}
        />
      ))}
    </>
  );
};

type TodoItem = Todo & {
  handleRemove: handleRemove;
  handleToggleTodo: toggleTodo;
};

const TodoItem = ({
  id,
  title,
  completed,
  handleRemove,
  handleToggleTodo,
}: TodoItem) => {
  return (
    <div>
      <div>id : {id}</div>
      <div>title : {title}</div>
      <div
        style={
          completed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        completed : {JSON.stringify(completed)}
      </div>
      <button
        onClick={() => {
          handleRemove(id);
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          handleToggleTodo({ id, completed });
        }}
      >
        완료
      </button>
    </div>
  );
};

export default App;
