
import { useState, useEffect } from 'react';

interface InterviewModuleProps {
  onComplete: () => void;
}

type ModuleType = 'learning' | 'motivation' | 'execution' | 'business';

const modules = [
  { id: 'learning', name: '学习能力', icon: 'ri-book-open-line' },
  { id: 'motivation', name: '自驱力', icon: 'ri-rocket-line' },
  { id: 'execution', name: '执行与批判', icon: 'ri-checkbox-circle-line' },
  { id: 'business', name: '业务能力', icon: 'ri-briefcase-line' }
];

const moduleContents: Record<ModuleType, { title: string; material: string; question: string; hint: string }> = {
  learning: {
    title: '学习能力评估：即时学习任务',
    material: `区块链共识机制简介

区块链是一种分布式账本技术，其核心挑战在于如何在没有中心化权威的情况下，让网络中的所有节点对账本状态达成一致。这就需要"共识机制"。

共识机制的本质是一套规则，用于决定谁有权记账（即添加新区块），以及如何验证这个记账是否有效。

常见的共识机制包括：

1. 工作量证明（PoW）：节点通过解决复杂的数学难题来竞争记账权。谁先解出难题，谁就能添加新区块并获得奖励。比特币使用的就是这种机制。优点是安全性高，缺点是耗能巨大。

2. 权益证明（PoS）：节点根据持有的代币数量和持有时间来获得记账权。持币越多、时间越长，被选中的概率越高。以太坊2.0采用了这种机制。优点是节能，缺点是可能导致"富者恒富"。

3. 委托权益证明（DPoS）：代币持有者投票选出若干"代表节点"负责记账，类似议会制度。优点是效率高，缺点是去中心化程度相对较低。

核心要点：共识机制解决的是"在没有中心化管理的情况下，如何让所有人对同一件事达成共识"的问题。不同机制在安全性、效率、去中心化程度之间做出不同的权衡。`,
    question: '请用你自己的话解释：什么是区块链的共识机制？它要解决什么问题？',
    hint: '本题评估你如何理解和组织新信息，而非是否给出标准答案。'
  },
  motivation: {
    title: '自驱力评估：目标与主动性',
    material: `关于自驱力与职业成长

自驱力（Intrinsic Motivation）是指个体在没有外部奖励或压力的情况下，主动追求目标、持续学习和自我提升的内在动力。

研究表明，高自驱力的人通常具备以下特征：

1. 主动设定目标：不等待他人分配任务，而是主动识别问题并制定行动计划。

2. 持续学习意愿：面对新领域时，表现出好奇心而非回避，主动寻找学习资源。

3. 自我反思能力：定期复盘自己的行为和结果，从失败中提取经验而非归咎外部因素。

4. 延迟满足：愿意为长期目标放弃短期舒适，能够在枯燥阶段坚持执行。

5. 内部归因：将成功归因于自身努力，将失败视为改进机会，而非运气或他人影响。

在职场中，自驱力强的员工往往能在模糊的环境中找到方向，在缺乏监督的情况下保持高效输出，并主动推动团队和项目向前发展。`,
    question: '请描述一个你主动发现问题并推动解决的真实经历。你是如何识别这个问题的？采取了哪些行动？结果如何？',
    hint: '本题评估你的主动性和自我驱动能力，请结合真实经历作答，无需给出"完美"答案。'
  },
  execution: {
    title: '执行与批判性思维评估',
    material: `关于执行力与批判性思维

执行力不仅仅是"把事情做完"，更是在复杂、模糊的情境下，能够拆解目标、识别障碍、调整策略并最终达成结果的综合能力。

批判性思维则是对信息、论点和决策进行系统性评估的能力，包括：

1. 识别假设：找出论点背后未被明说的前提条件。

2. 评估证据：判断支持某一结论的证据是否充分、可靠。

3. 发现逻辑漏洞：识别推理过程中的跳跃、矛盾或循环论证。

4. 多角度分析：从不同立场审视同一问题，避免单一视角的盲点。

5. 形成有依据的判断：在不确定性中做出合理决策，并能清晰说明理由。

优秀的执行者往往同时具备批判性思维——他们不只是执行命令，而是在执行过程中持续质疑"这是最优路径吗？"并在必要时提出改进建议。`,
    question: '请分析以下情境：你的团队正在推进一个项目，但你发现当前方案存在明显风险，而上级已经拍板决定。你会怎么做？请说明你的思考过程和行动步骤。',
    hint: '本题评估你的执行力与批判性思维，我们关注你的分析过程，而非唯一正确答案。'
  },
  business: {
    title: '业务能力评估：商业判断与场景分析',
    material: `互联网产品的用户增长策略

用户增长（Growth）是互联网产品的核心命题之一。常见的增长框架包括 AARRR 模型，涵盖以下五个阶段：

1. 获取（Acquisition）：通过广告投放、SEO、社交裂变等方式吸引新用户进入产品。

2. 激活（Activation）：让用户在首次使用时体验到产品的核心价值，完成"Aha Moment"（顿悟时刻）。

3. 留存（Retention）：通过推送通知、内容更新、社交关系等手段让用户持续回访。

4. 变现（Revenue）：将用户行为转化为商业价值，如订阅、广告、交易佣金等。

5. 推荐（Referral）：激励现有用户主动推荐产品给新用户，形成口碑传播。

在实际业务中，不同阶段的产品面临不同的增长瓶颈。早期产品通常优先解决激活问题（用户不理解产品价值），成熟产品则更关注留存和变现效率。

关键洞察：增长不是单一手段，而是对整个用户旅程的系统性优化。盲目追求获客数量而忽视激活和留存，往往导致"漏桶效应"——用户进来得快，流失得也快。`,
    question: '假设你负责一款新上线的 B2B SaaS 产品，注册用户数增长良好，但 30 日留存率只有 15%。请分析可能的原因，并提出 2-3 个具体的改善方向。',
    hint: '本题评估你对业务逻辑的理解和商业判断能力，我们关注你的分析框架和思考深度，而非标准答案。'
  }
};

export default function InterviewModule({ onComplete }: InterviewModuleProps) {
  const [currentModule, setCurrentModule] = useState<ModuleType>('learning');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isReading, setIsReading] = useState(true);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (timeLeft > 0 && isReading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isReading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const moduleOrder: ModuleType[] = ['learning', 'motivation', 'execution', 'business'];

  const handleSubmit = () => {
    const currentIndex = moduleOrder.indexOf(currentModule);
    if (currentIndex < moduleOrder.length - 1) {
      setCurrentModule(moduleOrder[currentIndex + 1]);
      setTimeLeft(180);
      setIsReading(true);
      setAnswer('');
    } else {
      onComplete();
    }
  };

  const content = moduleContents[currentModule];
  const currentIndex = moduleOrder.indexOf(currentModule);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 顶部状态栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 当前模块 */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 whitespace-nowrap">当前模块:</span>
              <div className="flex items-center gap-2">
                {modules.map((module, idx) => (
                  <div
                    key={module.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      currentModule === module.id
                        ? 'bg-teal-100 text-teal-700'
                        : idx < currentIndex
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {idx < currentIndex ? (
                        <i className="ri-check-line text-base text-green-500"></i>
                      ) : (
                        <i className={`${module.icon} text-base`}></i>
                      )}
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{module.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 进度 + 剩余时间 */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 whitespace-nowrap">
                {currentIndex + 1} / {moduleOrder.length}
              </span>
              <div className={`px-4 py-2 rounded-lg font-mono text-lg font-semibold ${
                timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + (isReading ? 0 : 0.5)) / moduleOrder.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：题目/学习材料 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
            </div>

            {isReading ? (
              <div>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <i className="ri-time-line text-teal-600"></i>
                    </div>
                    <p className="text-sm text-teal-800">
                      请仔细阅读以下材料，你有 3 分钟的阅读时间。阅读结束后将进入答题环节。
                    </p>
                  </div>
                </div>

                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm">
                  {content.material}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setIsReading(false)}
                    className="px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    我已阅读完毕，开始答题
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">题目</h3>
                  <p className="text-gray-700 leading-relaxed">{content.question}</p>
                </div>

                {currentModule === 'business' && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                        <i className="ri-bar-chart-line text-amber-600"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-800 mb-1">业务能力评估维度</p>
                        <ul className="text-xs text-amber-700 space-y-1">
                          <li>• 问题诊断：能否准确识别核心业务问题</li>
                          <li>• 框架思维：是否具备结构化分析能力</li>
                          <li>• 落地可行性：建议是否具有实际操作价值</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 右侧：回答区 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">你的回答</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
            </div>

            {isReading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                    <i className="ri-edit-line text-3xl text-gray-400"></i>
                  </div>
                  <p className="text-gray-500">请先完成材料阅读</p>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="请在此输入你的回答..."
                  className="w-full h-80 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700 text-sm"
                />

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">已输入 {answer.length} 字</div>
                  <button
                    onClick={handleSubmit}
                    disabled={answer.length < 50}
                    className={`px-8 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      answer.length >= 50
                        ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentModule === 'business' ? '完成面试' : '提交并继续'}
                    <i className={`${currentModule === 'business' ? 'ri-check-line' : 'ri-arrow-right-line'} ml-2`}></i>
                  </button>
                </div>
              </div>
            )}

            {/* 辅助提示 */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 leading-relaxed">
                <i className="ri-lightbulb-line mr-2"></i>
                {content.hint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
