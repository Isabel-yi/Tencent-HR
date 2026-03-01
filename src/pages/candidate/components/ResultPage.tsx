import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { InterviewConclusion } from '../../../api/interview';

type ResultType = 'pass' | 'transfer' | 'review';

interface ResultPageProps {
  conclusion?: InterviewConclusion | null;
}

const DEFAULT_ABILITIES = [
  { id: 'learning', name: '学习能力', score: 85, color: 'teal' },
  { id: 'motivation', name: '自驱力', score: 78, color: 'blue' },
  { id: 'execution', name: '执行力', score: 82, color: 'indigo' },
  { id: 'critical', name: '批判性思维', score: 75, color: 'violet' },
  { id: 'business', name: '业务能力', score: 70, color: 'fuchsia' }
];

export default function ResultPage({ conclusion }: ResultPageProps) {
  const [expandedAbility, setExpandedAbility] = useState<string | null>(null);
  const resultType: ResultType = conclusion?.resultType ?? 'pass';
  const summaryText = conclusion?.summary ?? (resultType === 'pass'
    ? '综合评估显示,你的能力特征与该岗位要求高度匹配,特别是在学习能力和执行力方面表现突出。'
    : resultType === 'transfer'
    ? '当前岗位匹配度一般,但你的能力画像更适合其他方向。系统已为你推荐更匹配的岗位,可在下方「其他适合你的岗位」中查看并一键转投。'
    : '本次评估证据处于灰区,建议由面试官人工复核。你的部分回答较简略或存在网络异常记录,补充说明或重新作答可能有助于更准确评估。');
  const abilityComments = conclusion?.abilityComments ?? [];
  const abilities: Array<{ id: string; name: string; score: number; color: string; comment?: string }> =
    abilityComments.length > 0
      ? abilityComments.map((a, i) => ({ id: `ability-${i}`, name: a.dimension, score: 0, color: 'teal', comment: a.comment }))
      : DEFAULT_ABILITIES;

  const evidences = [
    {
      ability: '学习能力',
      description: '在即时学习任务中,你能够快速抓住核心概念,并用自己的语言进行清晰表达。',
      examples: [
        '2分15秒内完成材料阅读,速度超过85%的候选人',
        '准确识别了"共识机制"的核心问题,表达逻辑清晰'
      ]
    },
    {
      ability: '自驱力',
      description: '展现出较强的主动性和目标导向思维。',
      examples: [
        '在开放性问题中主动提出了3个改进建议',
        '表现出对未知领域的探索意愿'
      ]
    },
    {
      ability: '执行力',
      description: '能够将想法转化为具体的行动步骤。',
      examples: [
        '在情境题中给出了结构化的执行方案',
        '考虑到了潜在风险和应对措施'
      ]
    }
  ];

  const transferJobs = [
    {
      title: '产品运营专员',
      match: 82,
      reasons: [
        '你的学习能力和批判性思维非常适合快速理解产品逻辑',
        '较强的自驱力能帮助你主动发现运营机会'
      ],
      gap: '建议补充数据分析相关知识'
    },
    {
      title: '用户研究助理',
      match: 78,
      reasons: [
        '批判性思维有助于深入分析用户行为',
        '学习能力强,能快速掌握研究方法'
      ],
      gap: '需要加强定性研究方法的学习'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-brain-line text-2xl text-teal-600"></i>
            </div>
            <span className="text-gray-900 text-lg font-semibold">腾讯AI面试</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer">
              下载报告
            </button>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-full cursor-pointer">
              <i className="ri-user-line text-teal-600"></i>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 模块1:结果摘要卡 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-teal-100 rounded-2xl">
              <i className="ri-checkbox-circle-line text-3xl text-teal-600"></i>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                你的 AI 面试分析结果
              </h1>
              {resultType === 'pass' && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="ri-thumb-up-line text-2xl text-teal-600"></i>
                    <h2 className="text-2xl font-semibold text-teal-900">恭喜!建议进入下一轮</h2>
                  </div>
                  <p className="text-teal-800 leading-relaxed">{summaryText}</p>
                </div>
              )}
              {resultType === 'transfer' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="ri-arrow-left-right-line text-2xl text-blue-600"></i>
                    <h2 className="text-2xl font-semibold text-blue-900">建议转岗</h2>
                  </div>
                  <p className="text-blue-800 leading-relaxed">{summaryText}</p>
                </div>
              )}
              {resultType === 'review' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="ri-question-line text-2xl text-amber-600"></i>
                    <h2 className="text-2xl font-semibold text-amber-900">待复核</h2>
                  </div>
                  <p className="text-amber-800 leading-relaxed">{summaryText}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 模块2:横向进度条 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">匹配度分析</h2>
          
          <div className="relative">
            {/* 进度条背景 */}
            <div className="h-12 bg-gray-200 rounded-full relative overflow-hidden">
              {/* 岗位需求区间 */}
              <div 
                className="absolute top-0 bottom-0 bg-blue-200"
                style={{ left: '60%', right: '10%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-800">岗位需求区间</span>
                </div>
              </div>
              
              {/* 你的能力位置 */}
              <div 
                className="absolute top-0 bottom-0 w-2 bg-teal-600"
                style={{ left: '78%' }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-teal-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    你的能力: 78%
                  </div>
                </div>
              </div>
            </div>

            {/* 刻度 */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              当前证据显示,你与该岗位的匹配度为 <strong className="text-teal-600">78%</strong>。
              你在学习能力和执行力方面表现优秀,建议继续强化业务基础知识。
            </p>
          </div>
        </div>

        {/* 模块3:能力雷达图 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">能力维度分析</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 雷达图占位 */}
            <div className="flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8">
              <div className="text-center">
                <div className="w-64 h-64 relative">
                  {/* 简化的雷达图表示 */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* 背景网格 */}
                    <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" opacity="0.3"/>
                    <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" opacity="0.3"/>
                    <polygon points="100,60 130,80 130,120 100,140 70,120 70,80" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" opacity="0.3"/>
                    
                    {/* 实际数据 */}
                    <polygon points="100,32 162,65 162,135 100,165 42,128 42,68" fill="#14b8a6" opacity="0.3" stroke="#14b8a6" strokeWidth="2"/>
                    
                    {/* 数据点 */}
                    <circle cx="100" cy="32" r="4" fill="#14b8a6"/>
                    <circle cx="162" cy="65" r="4" fill="#14b8a6"/>
                    <circle cx="162" cy="135" r="4" fill="#14b8a6"/>
                    <circle cx="100" cy="165" r="4" fill="#14b8a6"/>
                    <circle cx="42" cy="128" r="4" fill="#14b8a6"/>
                    <circle cx="42" cy="68" r="4" fill="#14b8a6"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 能力列表 */}
            <div className="space-y-4">
              {abilities.map((ability) => (
                <div key={ability.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedAbility(expandedAbility === ability.id ? null : ability.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{ability.name}</span>
                      <div className="flex items-center gap-3">
                        {ability.comment ? null : <span className="text-sm font-semibold text-teal-600">{ability.score}分</span>}
                        <i className={`ri-arrow-${expandedAbility === ability.id ? 'up' : 'down'}-s-line text-gray-400`}></i>
                      </div>
                    </div>
                    {ability.score > 0 && (
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${ability.score}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {expandedAbility === ability.id && (
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mt-3">
                        {ability.comment ?? '详细的子指标分析将在完整报告中展示...'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 模块4:潜力证据摘要 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">潜力证据摘要</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evidences.map((evidence, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-lg">
                    <i className="ri-star-line text-xl text-teal-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900">{evidence.ability}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {evidence.description}
                </p>
                
                <button 
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    const el = document.getElementById(`evidence-${index}`);
                    if (el) {
                      el.classList.toggle('hidden');
                    }
                  }}
                >
                  查看示例
                  <i className="ri-arrow-right-s-line"></i>
                </button>
                
                <div id={`evidence-${index}`} className="hidden mt-4 pt-4 border-t border-gray-200">
                  <ul className="space-y-2">
                    {evidence.examples.map((example, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-teal-500 mt-0.5"></i>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 模块5:岗位转投建议 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center">
              <i className="ri-lightbulb-line text-2xl text-amber-500"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">其他适合你的岗位</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transferJobs.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="px-3 py-1 bg-teal-100 rounded-full">
                    <span className="text-sm font-semibold text-teal-700">匹配度 {job.match}%</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">为什么推荐你:</h4>
                  <ul className="space-y-2">
                    {job.reasons.map((reason, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <i className="ri-check-line text-teal-500 mt-0.5"></i>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-xs text-amber-800">
                    <i className="ri-information-line mr-1"></i>
                    需要补齐: {job.gap}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                    一键转投该岗位
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                    了解详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
