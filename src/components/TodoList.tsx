import { useSelector } from "react-redux";

export function TodoList() {
  const todos = useSelector((store) => {
    return store;
  });

  console.log("todos aqui", todos);

  return (
    <ul>
      <li>Fazer Café</li>
      <li>Estudar Redux</li>
    </ul>
  );
}
