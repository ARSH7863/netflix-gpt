export const checkValidData = (fullName, email, password) => {
  if (fullName !== null) {
    const isNameValid = /^[a-zA-Z\s]+$/.test(fullName);
    if (!isNameValid) return "Name is not valid";
  }

  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) {
    return `Email is not valid`;
  }
  if (!isPasswordValid) {
    return `Password is not valid`;
  }

  return null;
};
