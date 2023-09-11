import { useState } from "react";

export function AddTodo() {
  const [newTodo, setNewTodo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(newTodo);
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
