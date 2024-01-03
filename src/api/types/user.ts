export class User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export class UserAuth {
  user_id?: string;
}

export class UserList {
  users: User[];
}