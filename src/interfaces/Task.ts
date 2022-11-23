interface Task {
  task_id: string;
  title: string;
  category: string;
  description: any;
  topic: string;
  status: string;
  energy_assigned: number;
  holder_name: string;
  attachments: string[];
  videos: string[];
  urls: string[];
  date: Date;
  comments: any[];
  delivery: {
    attachments: string[];
    videos: string[];
    urls: string[];
    description: any;
  };
  rating: number;
}

export { Task };
