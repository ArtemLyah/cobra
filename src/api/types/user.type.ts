export class User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  created_at: Date;
}

export class UserPayload {
  userId: string;
  username: string;
  avatar: string;
}