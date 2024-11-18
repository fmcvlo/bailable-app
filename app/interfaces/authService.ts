export interface AuthState {
  refreshToken: string;
  accessToken: string;
  user: UserState;
}

export interface UserState {
  id: number;
  email: string;
  createdAt: string;
}
