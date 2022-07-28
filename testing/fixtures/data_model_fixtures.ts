import { User, Message, Room } from "../../models/data_model.ts";

let nextId = "1";

export const getNextId = (): string => {
  const idAsNumber = Number(nextId);
  if (isNaN(idAsNumber)) {
    throw Error("nextId is not a number");
  }

  nextId = `${idAsNumber + 1}`;

  return nextId;
};

export const user = (overrides: Partial<User> = {}): User => ({
  gid: getNextId(),
  name: "John Doe",
  ...overrides,
});

export const message = (overrides: Partial<Message> = {}): Message => ({
  body: "Hello world",
  user: user(),
  ...overrides,
});

export const room = (overrides: Partial<Room> = {}): Room => ({
  gid: getNextId(),
  name: "Some Room",
  members: [getNextId(), getNextId(), getNextId()],
  messages: [message(), message(), message()],
  ...overrides,
});
