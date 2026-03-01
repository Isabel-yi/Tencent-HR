import express from 'express';
import cors from 'cors';
import { config } from './config';
import interviewRoutes from './routes/interview';

// 启动时检查 Key 是否被正确加载（不打印完整 Key）
const key = config.deepseek.apiKey;
if (key) {
  console.log('[DeepSeek] API Key 已加载, 长度:', key.length, ', 前缀:', key.slice(0, 7) + '...');
} else {
  console.warn('[DeepSeek] 未检测到 DEEPSEEK_API_KEY，请检查 backend/.env');
}

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://tencent-7r71q75qb-isabellecby1128-2056s-projects.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'backend is up' });
});

app.use('/api/interview', interviewRoutes);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Backend running on 0.0.0.0:${config.port}`);
});
