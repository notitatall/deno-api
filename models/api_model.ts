export interface MembershipChangeRequestBody {
  roomGid: string;
  userGid: string;
}

export interface MessageRequestBody {
  messageBody: string;
  roomGid: string;
  userGid: string;
}

export interface PostRoomRequestBody {
  name: string;
  userGid: string;
}

export interface GetRoomRequestBody {
  userGid: string;
  roomGid: string;
}

export interface GetUserRequestBody {
  userGid: string;
}

export interface PostUserRequestBody {
  userGid: string;
  name: string;
}
