import db from "../prismaClient.ts";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

function assignWebToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
}

function setAccessTokenCookie(res, token) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    domain: process.env.DOMAIN,
    maxAge: 1000 * 60 * 20
  });
}

export const register = async (req, res) => {
  const todaysDate = dayjs().format('YYYY-MM-DD');
  const { email, password } = req.body;

  try {
    const existingUser = await db.User.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(304).send('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 4);

    await db.User.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    const createdUser = await db.User.findUnique({
      where: {
        email
      }
    });

    if (!createdUser) {
      return res.status(503).send('Failed to create user');
    }

    await db.userPortfolio.create({
      data: {
        userId: createdUser.id,
        totalBalanceHistory: [{ date: todaysDate, value: 1000 }],
        cashBalanceHistory: [{ date: todaysDate, value: 1000 }]
      }
    });

    const token = assignWebToken(createdUser);
    setAccessTokenCookie(res, token);

    return res.status(200).json({ message: 'Register a user', email: createdUser.email });
  } catch (err) {
    return res.status(503).send(err.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = assignWebToken(user);
    setAccessTokenCookie(res, token);

    return res.status(200).json({ message: 'Logging was succesful', email: user.email });
  } catch (err) {
    return res.status(503).send(err.message);
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: "/"
  });

  return res.status(200).send('succesfully logged out');
};
