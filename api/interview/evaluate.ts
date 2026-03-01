import type { VercelRequest, VercelResponse } from '@vercel/node';
import { evaluateInterview, type EvaluateAnswerItem } from '../lib/deepseek';

function validateBody(body: unknown): body is { answers: EvaluateAnswerItem[] } {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.answers) || b.answers.length !== 4) return false;
  for (const a of b.answers) {
    if (!a || typeof a !== 'object') return false;
    const item = a as Record<string, unknown>;
    if (typeof item.module !== 'string' || typeof item.question !== 'string' || typeof item.userAnswer !== 'string')
      return false;
  }
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  if (!validateBody(req.body)) {
    res.status(400).json({ success: false, error: 'Invalid body: need answers (array of 4 items with module, question, userAnswer)' });
    return;
  }

  if (!(process.env.DEEPSEEK_API_KEY || '').trim()) {
    res.status(503).json({ success: false, error: 'DEEPSEEK_API_KEY is not configured' });
    return;
  }

  try {
    const conclusion = await evaluateInterview(req.body.answers);
    res.status(200).json({ success: true, conclusion });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Evaluation failed';
    console.error('evaluate error:', err);
    res.status(502).json({ success: false, error: message });
  }
}
