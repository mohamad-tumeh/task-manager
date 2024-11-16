export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TaskList {
    id: number;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    sharedWith?: SharedUser[];
  }
  
  export interface Task {
    id: number;
    title: string;
    completed: boolean;
    taskListId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SharedUser {
    id: number;
    username: string;
    permission: "view" | "edit";
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
  }
  