import bcrypt from "bcrypt";

const matchPassword = async ({ enteredPassword, actualPassword }) => {
  const isMatch = await bcrypt.compare(enteredPassword, actualPassword);
  //not match case
  if (!isMatch) {
    return false;
  }
  // match
  return true;
};

export default matchPassword;
