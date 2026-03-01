import { useState } from 'react';
import { Link } from 'react-router-dom';
import InterviewModule from './components/InterviewModule';
import ResultPage from './components/ResultPage';
import type { InterviewConclusion } from '../api/interview';

export default function CandidatePage() {
  const [currentView, setCurrentView] = useState<'start' | 'interview' | 'result'>('start');
  const [interviewConclusion, setInterviewConclusion] = useState<InterviewConclusion | null>(null);

  if (currentView === 'interview') {
    return (
      <InterviewModule
        onComplete={(conclusion) => {
          setInterviewConclusion(conclusion);
          setCurrentView('result');
        }}
      />
    );
  }

  if (currentView === 'result') {
    return <ResultPage conclusion={interviewConclusion} />;
  }

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
            <span className="text-sm text-gray-600">候选人端</span>
            <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-full cursor-pointer">
              <i className="ri-user-line text-teal-600"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* 欢迎页面 */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6">
            <i className="ri-sparkling-line text-teal-600"></i>
            <span className="text-teal-700 text-sm font-medium">AI智能评估</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            欢迎参加AI面试
          </h1>
          <p className="text-xl text-gray-600">
            本次面试将通过多维度评估你的能力与潜力
          </p>
        </div>

        {/* 面试说明卡片 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">面试流程说明</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
                <i className="ri-book-open-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">学习能力评估</h3>
                <p className="text-gray-600 leading-relaxed">
                  你将接收一段新内容,需要在限定时间内阅读并理解,然后用自己的话解释核心概念。我们关注你的信息理解速度、要点提取能力和表达重组能力。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-rocket-line text-2xl text-teal-600"></i>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">自驱力评估</h3>
                <p className="text-gray-600 leading-relaxed">
                  评估你的主动性、目标设定能力和自我管理能力。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-teal-600"></i>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">执行与批判性思维</h3>
                <p className="text-gray-600 leading-relaxed">
                  评估你的执行力、问题分析能力和批判性思维。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-briefcase-line text-2xl text-teal-600"></i>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">业务能力评估</h3>
                <p className="text-gray-600 leading-relaxed">
                  通过真实业务场景分析，评估你的商业判断力、框架思维和落地可行性。你将阅读一段业务背景材料，并针对具体问题提出结构化的分析与改善方向。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-information-line text-xl text-amber-600"></i>
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-900 mb-2">重要提示</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• 本次面试预计耗时 30-45 分钟,请确保网络稳定</li>
                <li>• 我们评估的是你的思维过程和潜力,而非标准答案</li>
                <li>• 请在安静的环境中完成面试,避免干扰</li>
                <li>• 回答时请真实表达,AI会识别你的独特优势</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 开始按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentView('interview')}
            className="px-12 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/50 transition-all hover:-translate-y-1 whitespace-nowrap cursor-pointer"
          >
            开始面试
            <i className="ri-arrow-right-line ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
