import jsonwebtoken from 'jsonwebtoken';

export function generate_jwt_token(user_id: string) {
  const token = jsonwebtoken.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,

    //expiresIn: 30 * 1,
  });

  return token;
}
