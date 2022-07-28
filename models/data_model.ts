export interface User {
  gid: string;
  name: string;
}

export interface Room {
  gid: string;
  name: string;
  messages: Message[];
  members: string[];
}

export interface Message {
  user: User;
  body: string;
}
