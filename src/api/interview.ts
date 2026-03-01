export type ResultType = 'pass' | 'transfer' | 'review';

export interface AbilityComment {
  dimension: string;
  comment: string;
}

export interface InterviewConclusion {
  summary: string;
  resultType: ResultType;
  abilityComments: AbilityComment[];
}

export interface EvaluateAnswerItem {
  module: string;
  moduleName: string;
  material: string;
  question: string;
  userAnswer: string;
}

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL) || 'http://localhost:3001';

export async function evaluateInterview(answers: EvaluateAnswerItem[]): Promise<InterviewConclusion> {
  const res = await fetch(`${API_BASE}/api/interview/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || `请求失败: ${res.status}`);
  }

  if (!data.success || !data.conclusion) {
    throw new Error(data?.error || '评估结果格式异常');
  }

  return data.conclusion as InterviewConclusion;
}
