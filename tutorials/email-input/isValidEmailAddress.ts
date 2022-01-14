const simpleEmailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const isValidEmailAddress = (email: string) => {
  return simpleEmailRegex.test(email);
};
