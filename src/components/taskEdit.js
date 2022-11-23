import { taskListState } from "../state/atoms";
import { useRecoilState } from "recoil";

export const TaskEdit = ({ item }) => {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const index = taskList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(taskList, index, {
      ...item,
      text: value,
    });

    setTaskList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(taskList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTaskList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(taskList, index);

    setTaskList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
