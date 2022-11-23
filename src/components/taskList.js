import { taskListState } from "../state/atoms";
import { useRecoilValue } from "recoil";
import { TaskCreator } from "./taskCreator";
import { TaskEdit } from "./taskEdit";

export const TaskList = () => {
  const taskList = useRecoilValue(taskListState);

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TaskCreator />

      {taskList.map((taskItem) => (
        <TaskEdit key={taskItem.id} item={taskItem}></TaskEdit>
      ))}
    </>
  );
};
