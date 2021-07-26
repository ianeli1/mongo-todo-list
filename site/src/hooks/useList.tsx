import { useEffect, useState } from "react";

const endpoint = "http://localhost:3000/api";

interface TodoEntry {
  content: string;
  createdOn: string;
  _id: string;
}

export function useList() {
  const [elements, setElements] = useState<TodoEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const updateList = async () => {
    setLoading(true);
    const data = await fetch(endpoint);
    const json = await data.json();
    setLoading(false);
    setElements(json);
    return json;
  };

  useEffect(() => {
    updateList();
  }, []);

  async function createElement(content: string) {
    const body = JSON.stringify({
      content,
    });
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
    await updateList();
    return;
  }

  async function updateElement(id: string, content: string) {
    const body = JSON.stringify({ content });

    await fetch(endpoint + "/" + id, {
      method: "PATCH",
      body,
    });

    await updateList();
    return;
  }

  async function deleteElement(id: string) {
    await fetch(endpoint + "/" + id, {
      method: "DELETE",
    });
    await updateList();
    return;
  }

  return {
    elements,
    updateList,
    createElement,
    updateElement,
    deleteElement,
    loading,
  };
}
