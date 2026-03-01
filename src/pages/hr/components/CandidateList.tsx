import { useState } from 'react';
import type { Candidate, StatusType } from '../data/candidates';

interface CandidateListProps {
  candidates: Candidate[];
  onSelectCandidate: (id: string) => void;
}

export default function CandidateList({ candidates, onSelectCandidate }: CandidateListProps) {
  const [filterStatus, setFilterStatus] = useState<StatusType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusConfig = (status: StatusType) => {
    const configs = {
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
    return configs[status];
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: candidates.length,
    recommend: candidates.filter(c => c.status === 'recommend').length,
    uncertain: candidates.filter(c => c.status === 'uncertain').length,
    transfer: candidates.filter(c => c.status === 'transfer').length
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">候选人管理</h1>
        <p className="text-gray-600">查看和管理所有面试候选人的评估结果</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">总候选人</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl">
              <i className="ri-group-line text-2xl text-gray-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-600 mb-1">推荐二面</p>
              <p className="text-3xl font-bold text-teal-700">{stats.recommend}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
              <i className="ri-thumb-up-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 mb-1">待复核</p>
              <p className="text-3xl font-bold text-amber-700">{stats.uncertain}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-xl">
              <i className="ri-question-line text-2xl text-amber-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-1">建议转岗</p>
              <p className="text-3xl font-bold text-blue-700">{stats.transfer}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl">
              <i className="ri-arrow-left-right-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索候选人姓名或岗位..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilterStatus('recommend')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === 'recommend'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              推荐
            </button>
            <button
              onClick={() => setFilterStatus('uncertain')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === 'uncertain'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              待复核
            </button>
            <button
              onClick={() => setFilterStatus('transfer')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === 'transfer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              转岗
            </button>
          </div>
        </div>
      </div>

      {/* 候选人列表 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  候选人
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  应聘岗位
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  匹配度区间
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  风险标记
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  面试日期
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => {
                const statusConfig = getStatusConfig(candidate.status);
                return (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white font-semibold">
                          {candidate.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{candidate.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {candidate.position}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color} whitespace-nowrap`}>
                        <i className={statusConfig.icon}></i>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{candidate.matchRange}</span>
                    </td>
                    <td className="px-6 py-4">
                      {candidate.riskFlags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {candidate.riskFlags.map((flag, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs whitespace-nowrap">
                              <i className="ri-alert-line"></i>
                              {flag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">无</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {candidate.interviewDate}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onSelectCandidate(candidate.id)}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm whitespace-nowrap cursor-pointer"
                      >
                        查看详情
                        <i className="ri-arrow-right-line ml-1"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCandidates.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-inbox-line text-3xl text-gray-400"></i>
            </div>
            <p className="text-gray-500">暂无符合条件的候选人</p>
          </div>
        )}
      </div>
    </div>
  );
}
