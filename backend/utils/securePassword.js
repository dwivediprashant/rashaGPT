import bcrypt from "bcrypt";

const securePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export default securePassword;
