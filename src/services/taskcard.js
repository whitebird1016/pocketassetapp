const getTask = async ({ task }) => {
  console.log(process.env.API_URL);

  const response = await fetch(
    process.env.API_URL + `/api/task/assistant/334626089347318347`,
    {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ task }),
    },
  );

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

export { getTask };
