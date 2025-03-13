export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    location: string;
    token?: string;
  }