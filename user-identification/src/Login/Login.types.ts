export type LoginValues = {
  email: string;
  password: string;
};

export type LoginProps = {
  setLoginEmail: (email: string) => void;
};
