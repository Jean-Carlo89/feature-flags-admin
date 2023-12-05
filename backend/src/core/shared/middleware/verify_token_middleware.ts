import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export async function verify_header_token_middleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.headers['authorization']) {
      return res.status(401).json({ message: 'Token missing' });
    }

    if (!req.headers['authorization'].startsWith('Bearer ')) {
      return res.status(401).json('Invalid token format');
    }

    const jwt = req.headers['authorization'].replace('Bearer ', '');

    const [result, token_payload] = verify_token(jwt);

    if (!token_payload) {
      return res.status(401).json({ message: 'unauthorized token' });
    }

    res.locals.token = token_payload;

    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Erro na verificaçãp' });
  }
}

export function verify_token(
  token: string,
): [verification_result: boolean, token_payload: string | JwtPayload] {
  const jwt = token;

  let verification_result;
  let token_payload: string | JwtPayload = null;
  verify(jwt, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      verification_result = false;
    } else {
      verification_result = true;
      token_payload = payload;
    }
  });

  return [verification_result, token_payload];
}
