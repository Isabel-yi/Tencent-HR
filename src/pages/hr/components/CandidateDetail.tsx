import { useState } from 'react';
import type { Candidate, StatusType } from '../data/candidates';

interface CandidateDetailProps {
  candidates: Candidate[];
  candidateId: string;
  onBack: () => void;
}

const statusConfig: Record<StatusType, { label: string; color: string; icon: string }> = {
  recommend: {
    label: '推荐进入二面',
    color: 'bg-teal-100 text-teal-700 border-teal-200',
    icon: 'ri-thumb-up-line'
  },
  uncertain: {
    label: '证据不足/灰区',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: 'ri-question-line'
  },
  transfer: {
    label: '建议转岗',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: 'ri-arrow-left-right-line'
  }
};

export default function CandidateDetail({ candidates, candidateId, onBack }: CandidateDetailProps) {
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [expandedAbility, setExpandedAbility] = useState<string | null>(null);

  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line"></i>
          返回候选人列表
        </button>
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500">未找到该候选人信息</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[candidate.status];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-arrow-left-line"></i>
        返回候选人列表
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧:能力概览 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 候选人基本信息 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white text-2xl font-bold">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{candidate.name}</h1>
                  <p className="text-gray-600">{candidate.position}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ${status.color}`}>
                <i className={status.icon}></i>
                {status.label}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">面试日期</p>
                <p className="text-sm font-medium text-gray-900">{candidate.interviewDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">邮箱</p>
                <p className="text-sm font-medium text-gray-900">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">电话</p>
                <p className="text-sm font-medium text-gray-900">{candidate.phone}</p>
              </div>
            </div>
          </div>

          {/* 能力雷达图和详细分析 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">能力分析</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 雷达图 */}
              <div className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50 rounded-xl p-6">
                <div className="w-64 h-64 relative">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" opacity="0.3"/>
                    <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" opacity="0.3"/>
                    <polygon points="100,60 130,80 130,120 100,140 70,120 70,80" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" opacity="0.3"/>
                    
                    <polygon points="100,32 162,65 162,135 100,165 42,128 42,68" fill="#f97316" opacity="0.3" stroke="#f97316" strokeWidth="2"/>
                    
                    <circle cx="100" cy="32" r="4" fill="#f97316"/>
                    <circle cx="162" cy="65" r="4" fill="#f97316"/>
                    <circle cx="162" cy="135" r="4" fill="#f97316"/>
                    <circle cx="100" cy="165" r="4" fill="#f97316"/>
                    <circle cx="42" cy="128" r="4" fill="#f97316"/>
                    <circle cx="42" cy="68" r="4" fill="#f97316"/>
                  </svg>
                </div>
              </div>

              {/* 能力得分 */}
              <div className="space-y-3">
                {candidate.abilities.map((ability) => (
                  <div key={ability.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{ability.name}</span>
                      <span className="text-sm font-semibold text-orange-600">{ability.score}分</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${ability.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 子指标展开 */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900 mb-3">详细子指标</h3>
              {candidate.abilities.map((ability) => (
                <div key={ability.name} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                    onClick={() => setExpandedAbility(expandedAbility === ability.name ? null : ability.name)}
                  >
                    <span className="font-medium text-gray-900">{ability.name}</span>
                    <i className={`ri-arrow-${expandedAbility === ability.name ? 'up' : 'down'}-s-line text-gray-400`}></i>
                  </div>
                  {expandedAbility === ability.name && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <ul className="space-y-2">
                        {ability.subItems.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <i className="ri-checkbox-circle-line text-orange-500"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 潜力证据 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">潜力证据</h2>
            
            <div className="space-y-4">
              {candidate.evidences.map((evidence, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-orange-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
                        <i className="ri-star-line text-xl text-orange-600"></i>
                      </div>
                      <h3 className="font-semibold text-gray-900">{evidence.ability}</h3>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {evidence.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {evidence.behavior}
                  </p>
                  
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    <i className="ri-play-circle-line"></i>
                    跳转到面试片段
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧:操作区 */}
        <div className="space-y-6">
          {/* 快速操作 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-check-line"></i>
                标记为"进入二面"
              </button>
              
              <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-arrow-left-right-line"></i>
                推荐转岗
              </button>
              
              <button className="w-full px-4 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-refresh-line"></i>
                发起复核
              </button>
              
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-mail-line"></i>
                发送邮件通知
              </button>
            </div>
          </div>

          {/* 人工备注 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">人工备注</h3>
              {!showNoteInput && (
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line mr-1"></i>
                  添加备注
                </button>
              )}
            </div>

            {showNoteInput ? (
              <div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="输入你的备注..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setShowNoteInput(false);
                      setNote('');
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setShowNoteInput(false);
                      setNote('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-8">
                暂无备注
              </div>
            )}
          </div>

          {/* 面试记录 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">面试记录</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900 font-medium">面试完成</p>
                  <p className="text-gray-500 text-xs">2025-01-15 14:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900 font-medium">开始面试</p>
                  <p className="text-gray-500 text-xs">2025-01-15 14:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900 font-medium">候选人报名</p>
                  <p className="text-gray-500 text-xs">2025-01-14 10:20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
