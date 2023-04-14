export const emailValidator = (email: string) => {
  return email.includes("@");
};

export const passwordValidator = (password: string) => {
  return password.length >= 8;
};
