import { taskListState } from "../state/atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export const TaskCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTaskList = useSetRecoilState(taskListState);

  const addItem = () => {
    setTaskList((oldTaskList) => [
      ...oldTaskList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    console.log(value);
    setInputValue(value);
  };

  return (
    <div>
      <label>Enter task name</label>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
