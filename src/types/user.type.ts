export class User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export class UsersResponse {
  users: User[];
}