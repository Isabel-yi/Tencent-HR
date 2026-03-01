import OpenAI from 'openai';
import { config } from '../config';

export type ResultType = 'pass' | 'transfer' | 'review';

export interface AbilityComment {
  dimension: string;
  comment: string;
}

export interface EvaluateConclusion {
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

// 与 DeepSeek 官方示例一致: https://platform.deepseek.com
function getClient(): OpenAI | null {
  const apiKey = config.deepseek.apiKey;
  if (!apiKey) return null;
  const openai = new OpenAI({
    baseURL: config.deepseek.baseURL,
    apiKey,
  });
  return openai;
}

function buildPrompt(answers: EvaluateAnswerItem[]): string {
  const parts = answers.map(
    (a) =>
      `【${a.moduleName}】\n材料摘要：${a.material.slice(0, 500)}${a.material.length > 500 ? '...' : ''}\n题目：${a.question}\n候选人回答：${a.userAnswer}`
  );
  return parts.join('\n\n---\n\n');
}

const SYSTEM_PROMPT = `你是一名专业的 AI 面试评估官（AI Interview Evaluator）。

你的唯一职责是：根据给定的【面试题目/材料】和【候选人回答】，对候选人的能力进行客观、结构化、可解释的评估。

评估时请遵循以下原则：
1. 你不是聊天助手，不提供情感安慰或建议。
2. 不引导候选人，不补充答案，不替候选人思考。
3. 只基于候选人已给出的内容进行判断，不进行善意推测。
4. 保持中立、克制、审慎的评估语气。

评估重点包括：学习能力、自驱力、执行力、批判性思维、业务能力五个维度，请根据题目和答案进行分析。

输出要求：
- 使用简洁、专业、评估导向的语言。
- 不使用情绪化或主观判断词（如「我觉得」「我喜欢」）。
- 如需评分，请给出明确评分及简要理由。

你必须只输出一个合法的 JSON 对象，不要输出任何其他文字或 markdown 标记。JSON 格式如下：
{
  "summary": "一段总评（2-4 句话，客观概括候选人在各维度的表现及结论）",
  "resultType": "pass" | "transfer" | "review",
  "abilityComments": [
    { "dimension": "学习能力", "comment": "基于证据的简短评估" },
    { "dimension": "自驱力", "comment": "基于证据的简短评估" },
    { "dimension": "执行与批判性思维", "comment": "基于证据的简短评估" },
    { "dimension": "业务能力", "comment": "基于证据的简短评估" }
  ]
}

resultType 含义：pass=建议进入下一轮，transfer=建议转岗，review=证据不足需人工复核。仅根据回答质量、逻辑与岗位匹配度判断，不做主观揣测。`;

export async function evaluateInterview(answers: EvaluateAnswerItem[]): Promise<EvaluateConclusion> {
  const client = getClient();
  if (!client) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  const userContent = buildPrompt(answers);

  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContent },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error('Empty response from model');
  }

  // 允许被 markdown 代码块包裹
  let jsonStr = raw;
  const codeBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    jsonStr = codeBlock[1].trim();
  }

  const parsed = JSON.parse(jsonStr) as EvaluateConclusion;

  if (!parsed.summary || !parsed.resultType || !Array.isArray(parsed.abilityComments)) {
    throw new Error('Invalid conclusion format from model');
  }
  if (!['pass', 'transfer', 'review'].includes(parsed.resultType)) {
    parsed.resultType = 'review';
  }

  return parsed;
}
