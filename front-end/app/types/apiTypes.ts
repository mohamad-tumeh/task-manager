// src/types/apiTypes.ts
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: boolean;
  }
  
  export interface Task {
    id: number;
    taskListId: number;
    title: string;
    is_completed: boolean;
  }
  
  export interface TaskList {
    id: number;
    title: string;
    description?: string;
  }
  
  export interface SharedTask {
    id: number;
    taskListId: number;
    username: string;
    permission: "view" | "edit";
  }
  