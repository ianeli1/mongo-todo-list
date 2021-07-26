import { useList } from "../hooks/useList";

interface ListProps {}

export function List({}: ListProps) {
  const { elements, loading, deleteElement } = useList();

  return (
    <div>
      {elements.map((e) => (
        <h1>
          {e.content}
          <button onClick={() => deleteElement(e._id)}>x</button>
        </h1>
      ))}
      {loading ? <b>loading</b> : undefined}
    </div>
  );
}
