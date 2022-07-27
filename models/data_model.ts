export interface User {
  gid: string;
  name: string;
}

export interface Room {
  gid: string;
  messages: Message[];
  members: Set<string>;
}

export interface Message {
  user: User;
  body: string;
}
