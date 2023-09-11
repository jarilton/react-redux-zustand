import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store";

export function AddTodo() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    dispatch(
      addTodo({
        newTodo,
      })
    );

    setNewTodo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Novo todo"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
