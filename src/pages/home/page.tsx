
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#0f1419] to-[#1a1f3a] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(26,31,58,0.85)] backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-brain-line text-2xl text-[#4a90e2]"></i>
            </div>
            <span className="text-white text-lg font-semibold">腾讯AI面试</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-[#a8b2d1] hover:text-white transition-colors text-sm whitespace-nowrap cursor-pointer">关于平台</a>
            <a href="#help" className="text-[#a8b2d1] hover:text-white transition-colors text-sm whitespace-nowrap cursor-pointer">帮助中心</a>
            <a href="#login" className="text-[#a8b2d1] hover:text-white transition-colors text-sm whitespace-nowrap cursor-pointer">登录</a>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* 标题区域 */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/20 border border-[#6366f1]/30 rounded-full mb-6">
              <span className="text-[#a8b2d1] text-sm">腾讯AI面试系统 v2.0</span>
            </div>
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              智能面试,精准匹配
            </h1>
            <p className="text-3xl text-[#7c8db0] font-light">
              基于行为证据的能力分析,让每一次面试都有价值
            </p>
          </div>

          {/* 双卡片选择区 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-20">
            {/* 候选人端卡片 */}
            <Link to="/candidate" className={`group transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative bg-gradient-to-br from-[#2d3561] to-[#1e2a4a] rounded-3xl p-10 h-[520px] flex flex-col border border-[#4a90e2]/30 shadow-2xl hover:shadow-[0_20px_60px_rgba(74,144,226,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                {/* 图标区 */}
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-[#4a90e2]/20 rounded-2xl border border-[#4a90e2]/30">
                    <i className="ri-user-smile-line text-5xl text-[#4a90e2]"></i>
                  </div>
                </div>

                {/* 标题和描述 */}
                <div className="flex-1 text-center">
                  <h2 className="text-4xl font-semibold text-white mb-4">候选人入口</h2>
                  <p className="text-[#8892b0] text-base leading-relaxed mb-2">
                    参与AI面试评估
                  </p>
                  <p className="text-[#8892b0] text-base leading-relaxed mb-2">
                    查看能力分析报告
                  </p>
                  <p className="text-[#8892b0] text-base leading-relaxed">
                    获取岗位匹配建议
                  </p>
                </div>

                {/* 按钮区 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-4/5 bg-gradient-to-r from-[#4a90e2] to-[#357abd] rounded-full py-4 px-8 flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-[#4a90e2]/50 transition-all whitespace-nowrap">
                    <span className="text-white text-lg font-medium">开始面试</span>
                    <i className="ri-arrow-right-line text-white text-xl"></i>
                  </div>
                  <span className="text-[#7c8db0] text-sm underline cursor-pointer">首次使用?查看操作指南</span>
                </div>
              </div>
            </Link>

            {/* HR/集团端卡片 */}
            <Link to="/hr" className={`group transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative bg-gradient-to-br from-[#4a2c2a] to-[#2d1b1a] rounded-3xl p-10 h-[520px] flex flex-col border border-[#e27b4a]/30 shadow-2xl hover:shadow-[0_20px_60px_rgba(226,123,74,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                {/* 图标区 */}
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-[#e27b4a]/20 rounded-2xl border border-[#e27b4a]/30">
                    <i className="ri-bar-chart-box-line text-5xl text-[#e27b4a]"></i>
                  </div>
                </div>

                {/* 标题和描述 */}
                <div className="flex-1 text-center">
                  <h2 className="text-4xl font-semibold text-white mb-4">HR / 面试官入口</h2>
                  <p className="text-[#b89088] text-base leading-relaxed mb-2">
                    查看候选人分析
                  </p>
                  <p className="text-[#b89088] text-base leading-relaxed mb-2">
                    管理面试流程
                  </p>
                  <p className="text-[#b89088] text-base leading-relaxed">
                    生成评估报告
                  </p>
                </div>

                {/* 按钮区 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-4/5 bg-gradient-to-r from-[#e27b4a] to-[#c85a2a] rounded-full py-4 px-8 flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-[#e27b4a]/50 transition-all whitespace-nowrap">
                    <span className="text-white text-lg font-medium">进入管理后台</span>
                    <i className="ri-arrow-right-line text-white text-xl"></i>
                  </div>
                  <span className="text-[#b89088] text-sm">需要管理员权限登录</span>
                </div>
              </div>
            </Link>
          </div>

          {/* 数据展示条 */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 font-mono">10,000+</div>
              <div className="text-[#7c8db0] text-sm">已完成面试</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 font-mono">95%</div>
              <div className="text-[#7c8db0] text-sm">候选人满意度</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 font-mono">50+</div>
              <div className="text-[#7c8db0] text-sm">合作企业</div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="relative z-10 bg-[#0a0e1a] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[#7c8db0] text-sm">
              © 2025 腾讯AI面试平台
            </div>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-[#7c8db0] hover:text-white text-sm transition-colors cursor-pointer">隐私政策</a>
              <a href="#terms" className="text-[#7c8db0] hover:text-white text-sm transition-colors cursor-pointer">使用条款</a>
              <a href="#support" className="text-[#7c8db0] hover:text-white text-sm transition-colors cursor-pointer">技术支持</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <i className="ri-wechat-line text-white"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <i className="ri-mail-line text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
