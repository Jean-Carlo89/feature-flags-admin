import bcrypt from 'bcrypt';

export const compare_hash = (password: string, hash: string) => {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (e) {
    throw new Error(
      'Error comparing password and hash, check if the variables are valid',
    );
  }
};
