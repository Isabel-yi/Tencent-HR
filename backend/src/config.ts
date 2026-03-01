import path from 'path';
import dotenv from 'dotenv';

// 最先加载 .env：固定从 backend 目录读取，避免启动目录不同导致读不到
dotenv.config({ path: path.join(__dirname, '..', '.env') });

function cleanEnv(value: string | undefined, fallback: string): string {
  if (!value || typeof value !== 'string') return fallback;
  return value.replace(/\r/g, '').trim() || fallback;
}

export const config = {
  port: Number(process.env.PORT) || 3001,
  deepseek: {
    apiKey: cleanEnv(process.env.DEEPSEEK_API_KEY, ''),
    baseURL: cleanEnv(process.env.DEEPSEEK_BASE_URL, 'https://api.deepseek.com') || 'https://api.deepseek.com',
  },
};
