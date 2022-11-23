import { atom } from "recoil";
import { Task } from "../interfaces/Task";
import { Delivery } from "../interfaces/Delivery";

export const taskListState = atom({
  key: "TaskList",
  default: [],
});

export const TaskTypes = [
  { name: "Personal Tasks", value: "personal_tasks" },
  { name: "Administration", value: "administration" },
  {
    name: "Lead Generation",
    value: "lead_generation",
  },
  { name: "Web3 Research", value: "web3_research" },
];

export const TaskTopics = [
  { name: "Find", value: "find" },
  { name: "Collect", value: "collect" },
  {
    name: "Make",
    value: "make",
  },
  { name: "Add", value: "add  " },
  { name: "Search", value: "Search" },
];

export const initialAuthState = {
  role: null,
  accessToken: null,
  walletAddress: null,
  user_id: null,
  user_name: "",
  email: "",
  energy: 0,
  ignore_tasks: [],
};

export const defaultDeliveryState = {
  attachments: [],
  videos: [],
  urls: [],
  description: "",
};

export const authState = atom({
  key: "Auth",
  default: {
    ...initialAuthState,
    accessToken: localStorage.getItem("accessToken"),
    user_id: localStorage.getItem("user_id"),
  } as AuthAtomState,
});

export const userState = atom({
  key: "User",
  default: {},
});

type AuthAtomState = {
  role: "pa" | "owner" | null;
  accessToken: string | null;
  walletAddress?: string | null;
  user_id: string | null;
  user_name?: string | null;
  email?: string | null;
  energy?: number;
  ignore_tasks?: string[] | [];
};

export const taskState = atom({
  key: "activeTask",
  default: {
    task_id: "",
    title: "",
    date: new Date(),
    category: "",
    description: "",
    topic: "",
    status: "none",
    energy_assigned: 0,
    holder_name: "",
    attachments: [],
    videos: [],
    urls: [],
    comments: [],
    delivery: defaultDeliveryState,
    rating: 0,
  } as Task,
});

export const deliveryState = atom({
  key: "activeDelivery",
  default: {
    description: "",
    attachments: [],
    videos: [],
    urls: [],
  } as Delivery,
});

export const defaultTaskState = {
  task_id: "",
  title: "",
  date: new Date(),
  category: "",
  description: "",
  topic: "",
  status: "none",
  energy_assigned: 0,
  holder_name: "",
  attachments: [],
  videos: [],
  urls: [],
  comments: [],
  delivery: {
    description: "",
    videos: [],
    urls: [],
    comments: [],
    attachments: [],
  },
  rating: 0,
};
