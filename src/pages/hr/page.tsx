import { useState } from 'react';
import { Link } from 'react-router-dom';
import CandidateList from './components/CandidateList';
import CandidateDetail from './components/CandidateDetail';
import { candidatesData } from './data/candidates';

export default function HRPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-brain-line text-2xl text-orange-600"></i>
            </div>
            <span className="text-gray-900 text-lg font-semibold">腾讯AI面试</span>
          </Link>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-download-line"></i>
              导出报告
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-settings-3-line"></i>
              设置
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">HR管理端</span>
              <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full cursor-pointer">
                <i className="ri-user-line text-orange-600"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {selectedCandidate ? (
        <CandidateDetail
          candidates={candidatesData}
          candidateId={selectedCandidate}
          onBack={() => setSelectedCandidate(null)}
        />
      ) : (
        <CandidateList
          candidates={candidatesData}
          onSelectCandidate={setSelectedCandidate}
        />
      )}
    </div>
  );
}
