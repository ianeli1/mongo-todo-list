import { useState } from "react";
import { useList } from "../hooks/useList";

export function Create() {
  const [content, setContent] = useState("");
  const { createElement, loading } = useList();

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button disabled={loading} onClick={() => createElement(content)}>
        Create
      </button>
    </div>
  );
}
