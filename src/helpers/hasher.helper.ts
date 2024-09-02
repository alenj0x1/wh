import 'dotenv/config';
import bcrypt from 'bcrypt';

const SALT = process.env.BCRYPT_SALT || '10';

export async function hashPassword(password: string) {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function generateSalt() {
  return await bcrypt.genSalt(parseInt(SALT));
}
