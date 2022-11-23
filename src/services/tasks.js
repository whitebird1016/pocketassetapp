import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";

const getTasksByOwnerId = async (token, userId, withTemplate = false) => {
  const endpoint = withTemplate
    ? `/api/task/holder/${userId}?type=template`
    : `/api/task/holder/${userId}`;

  const response = await axios.get(process.env.API_URL + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response && (response.ok || response.status < 300)) {
    return await response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};

const getTasksByPAId = async (token, userId) => {
  const response = await axios.get(
    process.env.API_URL + `/api/task/assistant/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response && (response.ok || response.status < 300)) {
    return await response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};

const createTask = async (token, task, isPublish) => {
  if (task.urls[task.urls.length - 1] === "") {
    task.urls = task.urls.slice(0, -1);
  }
  if (task.videos[task.videos.length - 1] === "") {
    task.videos = task.videos.slice(0, -1);
  }
  const response = await fetch(process.env.API_URL + `/api/task/`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ task, do_publish: isPublish }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const getTasksByStatus = async (token, status) => {
  const response = await axios.get(
    process.env.API_URL + `/api/task/status/${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response && (response.ok || response.status < 300)) {
    return await response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};

/* Commented out since this was in my local version but confliced with what was later found in development version
const getTaskById = async (token, userId) => {
  const response = await axios.get(
    process.env.API_URL + `/api/task/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 200) {
    return response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};
*/

const getTaskById = async (token, taskId, withComments = false) => {
  const response = await axios.get(
    process.env.API_URL + `/api/task/${taskId}`,
    {
      params: {
        comments: withComments,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response && (response.ok || response.status < 300)) {
    return await response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};

const changeTaskStatus = async (token, task_id, status) => {
  const response = await fetch(process.env.API_URL + `/api/task/status`, {
    method: "POST",
    headers: { "Content-Type": "text/plain", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ task_id, status }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const updateTask = async (token, _task, taskId) => {
  // making a copy so as not to affect the original (plus got strange results whereby the original arrays were not affected when assigned sliced values)
  let task = Object.assign({}, _task);
  if (task.urls) {
    task.urls = [...task.urls];
  }
  if (task.videos) {
    task.vidoes = [...task.videos];
  }
  if (_task.delivery) {
    task.delivery = Object.assign({}, _task.delivery);
    task.delivery.videos = [...task.delivery.videos]; // important to create new copies of the arrays that are not references to original arrays - otherwise sometimes the manipulation below was not having any effect when assigning the sliced values
    task.delivery.urls = [...task.delivery.urls];
  }
  // removing empty last items (lat itmes are often empty as that is needed in edit mode to show an empty input field)
  if (task.urls?.[task.urls?.length - 1] == "") {
    task.urls = task.urls.slice(0, -1);
  }
  if (task.videos?.[task.videos?.length - 1] == "") {
    task.videos = task.videos.slice(0, -1);
  }
  /*
  if (
    task.delivery &&
    task.delivery.urls &&
    !task.delivery.urls[task.delivery.urls.length - 1]
  ) {
    console.log([...task.delivery.urls]);
    console.log("removing empty spaces");
    let copy = [...task.delivery.urls];
    let sliceResult = copy.slice(0, -1);
    console.log("slice result", sliceResult);
    console.log("result length: ", sliceResult.length);
    task.delivery.urls = sliceResult;
    console.log([...task.delivery.urls]);
  }
  */
  if (task.delivery?.urls?.[task.delivery?.urls?.length - 1] == "") {
    task.delivery.urls = task.delivery?.urls?.slice(0, -1);
  }
  if (task.delivery?.videos?.[task.delivery?.videos?.length - 1] == "") {
    task.delivery.videos = task.delivery?.videos?.slice(0, -1);
  }
  const response = await fetch(process.env.API_URL + `/api/task/`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: task,
      task_id: taskId,
    }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const setTaskStatus = async (token, values) => {
  console.log('value :>> ', values);
  const response = await fetch(process.env.API_URL + `/api/task/status`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ task_id: values.id, status: values.status }),
  });

  console.log("result from status change", response);
  if (response && response.ok) {
    return await response.json();
  } else if (response && response.status === 400) {
    let result = await response.json();
    return { success: false, message: result.message };
  }

  throw new Error(`Error with code ${response?.status}`);
};

const addTaskComment = async (token, comment, taskId) => {
  const response = await fetch(process.env.API_URL + `/api/comment/`, {
    method: "POST",
    headers: { "Content-Type": "text/plain", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ comment, task_id: taskId }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const addRatingData = async (token, ratingdata, taskId) => {
  const response = await fetch(process.env.API_URL + `/api/rating`, {
    method: "POST",
    headers: { "Content-Type": "text/plain", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      feedback: ratingdata.feedback,
      rating: ratingdata.rating,
      task_id: taskId,
    }),
  });
  if (response && response.ok) {
    return await response.json();
  }
  throw new Error(`Error with code ${response?.status}`);
};

const deleteTask = async (token, taskId) => {
  const response = await axios.delete(process.env.API_URL + `/api/task`, {
    params: {
      id: taskId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response && (response.ok || response.status < 300)) {
    return await response.data;
  }

  throw new Error(`Error with code ${response?.status}`);
};

export {
  getTasksByOwnerId,
  createTask,
  updateTask,
  getTasksByPAId,
  getTaskById,
  addTaskComment,
  getTasksByStatus,
  changeTaskStatus,
  setTaskStatus,
  deleteTask,
  addRatingData,
};
