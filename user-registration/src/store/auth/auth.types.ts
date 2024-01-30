export type SignUpPayload = {
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  isGameCompleted: boolean;
};
