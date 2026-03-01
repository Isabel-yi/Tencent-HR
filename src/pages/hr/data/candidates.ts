export type StatusType = 'recommend' | 'uncertain' | 'transfer';

export interface CandidateAbility {
  name: string;
  score: number;
  subItems: string[];
}

export interface CandidateEvidence {
  ability: string;
  behavior: string;
  timestamp: string;
  segment: string;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  status: StatusType;
  matchRange: string;
  riskFlags: string[];
  interviewDate: string;
  score: number;
  email: string;
  phone: string;
  abilities: CandidateAbility[];
  evidences: CandidateEvidence[];
}

export const candidatesData: Candidate[] = [
  {
    id: '1',
    name: '张伟',
    position: '产品经理',
    status: 'recommend',
    matchRange: '75-85%',
    riskFlags: [],
    interviewDate: '2025-01-15',
    score: 82,
    email: 'zhangwei@example.com',
    phone: '138****5678',
    abilities: [
      { name: '学习能力', score: 85, subItems: ['信息理解速度: 90', '核心要点提取: 82', '表达重组能力: 83'] },
      { name: '自驱力', score: 78, subItems: ['主动性: 80', '目标设定: 75', '自我管理: 79'] },
      { name: '执行力', score: 82, subItems: ['任务完成度: 85', '时间管理: 80', '结果导向: 81'] },
      { name: '批判性思维', score: 75, subItems: ['问题分析: 78', '逻辑推理: 73', '创新思维: 74'] },
      { name: '业务能力', score: 70, subItems: ['业务理解: 72', '专业知识: 68', '实践应用: 70'] }
    ],
    evidences: [
      { ability: '学习能力', behavior: '在即时学习任务中,候选人在2分15秒内完成了材料阅读,速度超过85%的候选人。能够准确识别"共识机制"的核心问题,并用自己的语言进行了清晰表达。', timestamp: '00:03:45', segment: 'learning-task-1' },
      { ability: '自驱力', behavior: '在开放性问题中,候选人主动提出了3个改进建议,展现出较强的主动性和目标导向思维。', timestamp: '00:15:20', segment: 'motivation-task-1' },
      { ability: '执行力', behavior: '在情境题中给出了结构化的执行方案,考虑到了潜在风险和应对措施。', timestamp: '00:25:10', segment: 'execution-task-1' }
    ]
  },
  {
    id: '2',
    name: '李娜',
    position: '前端工程师',
    status: 'recommend',
    matchRange: '80-90%',
    riskFlags: [],
    interviewDate: '2025-01-15',
    score: 88,
    email: 'lina@example.com',
    phone: '139****1234',
    abilities: [
      { name: '学习能力', score: 90, subItems: ['信息理解速度: 92', '核心要点提取: 88', '表达重组能力: 90'] },
      { name: '自驱力', score: 85, subItems: ['主动性: 86', '目标设定: 84', '自我管理: 85'] },
      { name: '执行力', score: 88, subItems: ['任务完成度: 90', '时间管理: 86', '结果导向: 88'] },
      { name: '批判性思维', score: 82, subItems: ['问题分析: 84', '逻辑推理: 80', '创新思维: 82'] },
      { name: '业务能力', score: 80, subItems: ['业务理解: 82', '专业知识: 78', '实践应用: 80'] }
    ],
    evidences: [
      { ability: '学习能力', behavior: '对前端技术栈理解迅速,能快速归纳材料中的关键概念并举例说明。', timestamp: '00:02:50', segment: 'learning-task-1' },
      { ability: '自驱力', behavior: '提到曾主动学习新框架并推动团队迁移,体现出较强的自我驱动。', timestamp: '00:12:30', segment: 'motivation-task-1' },
      { ability: '执行力', behavior: '在项目冲突情境中给出了清晰的沟通步骤与备选方案。', timestamp: '00:22:15', segment: 'execution-task-1' }
    ]
  },
  {
    id: '3',
    name: '王强',
    position: '数据分析师',
    status: 'uncertain',
    matchRange: '55-65%',
    riskFlags: ['回答过短'],
    interviewDate: '2025-01-14',
    score: 62,
    email: 'wangqiang@example.com',
    phone: '136****8765',
    abilities: [
      { name: '学习能力', score: 65, subItems: ['信息理解速度: 68', '核心要点提取: 62', '表达重组能力: 65'] },
      { name: '自驱力', score: 58, subItems: ['主动性: 60', '目标设定: 56', '自我管理: 58'] },
      { name: '执行力', score: 62, subItems: ['任务完成度: 64', '时间管理: 60', '结果导向: 62'] },
      { name: '批判性思维', score: 60, subItems: ['问题分析: 62', '逻辑推理: 58', '创新思维: 60'] },
      { name: '业务能力', score: 65, subItems: ['业务理解: 66', '专业知识: 64', '实践应用: 65'] }
    ],
    evidences: [
      { ability: '学习能力', behavior: '材料阅读后回答较简略,部分要点未展开,建议复核是否因时间紧张。', timestamp: '00:04:20', segment: 'learning-task-1' },
      { ability: '自驱力', behavior: '自驱相关问题的回答篇幅偏短,证据有限。', timestamp: '00:16:00', segment: 'motivation-task-1' }
    ]
  },
  {
    id: '4',
    name: '刘芳',
    position: '产品经理',
    status: 'transfer',
    matchRange: '60-70%',
    riskFlags: [],
    interviewDate: '2025-01-14',
    score: 68,
    email: 'liufang@example.com',
    phone: '137****4321',
    abilities: [
      { name: '学习能力', score: 72, subItems: ['信息理解速度: 74', '核心要点提取: 70', '表达重组能力: 72'] },
      { name: '自驱力', score: 75, subItems: ['主动性: 76', '目标设定: 74', '自我管理: 75'] },
      { name: '执行力', score: 68, subItems: ['任务完成度: 70', '时间管理: 66', '结果导向: 68'] },
      { name: '批判性思维', score: 70, subItems: ['问题分析: 72', '逻辑推理: 68', '创新思维: 70'] },
      { name: '业务能力', score: 58, subItems: ['业务理解: 60', '专业知识: 56', '实践应用: 58'] }
    ],
    evidences: [
      { ability: '自驱力', behavior: '在自驱力维度表现较好,有明确的自我提升计划。', timestamp: '00:14:10', segment: 'motivation-task-1' },
      { ability: '业务能力', behavior: '业务场景题分析深度不足,更偏运营/用研方向,建议转岗评估。', timestamp: '00:28:00', segment: 'business-task-1' }
    ]
  },
  {
    id: '5',
    name: '陈明',
    position: '后端工程师',
    status: 'recommend',
    matchRange: '78-88%',
    riskFlags: [],
    interviewDate: '2025-01-13',
    score: 85,
    email: 'chenming@example.com',
    phone: '135****9876',
    abilities: [
      { name: '学习能力', score: 86, subItems: ['信息理解速度: 88', '核心要点提取: 84', '表达重组能力: 86'] },
      { name: '自驱力', score: 82, subItems: ['主动性: 83', '目标设定: 81', '自我管理: 82'] },
      { name: '执行力', score: 88, subItems: ['任务完成度: 90', '时间管理: 86', '结果导向: 88'] },
      { name: '批判性思维', score: 84, subItems: ['问题分析: 85', '逻辑推理: 83', '创新思维: 84'] },
      { name: '业务能力', score: 82, subItems: ['业务理解: 84', '专业知识: 80', '实践应用: 82'] }
    ],
    evidences: [
      { ability: '执行力', behavior: '在情境题中给出了分阶段、可落地的执行方案,并考虑了技术债务。', timestamp: '00:24:00', segment: 'execution-task-1' },
      { ability: '业务能力', behavior: '能结合系统架构理解业务诉求,分析有框架感。', timestamp: '00:32:20', segment: 'business-task-1' }
    ]
  },
  {
    id: '6',
    name: '赵丽',
    position: 'UI设计师',
    status: 'uncertain',
    matchRange: '50-60%',
    riskFlags: ['网络异常'],
    interviewDate: '2025-01-13',
    score: 58,
    email: 'zhaoli@example.com',
    phone: '134****5566',
    abilities: [
      { name: '学习能力', score: 62, subItems: ['信息理解速度: 64', '核心要点提取: 60', '表达重组能力: 62'] },
      { name: '自驱力', score: 60, subItems: ['主动性: 62', '目标设定: 58', '自我管理: 60'] },
      { name: '执行力', score: 55, subItems: ['任务完成度: 57', '时间管理: 53', '结果导向: 55'] },
      { name: '批判性思维', score: 58, subItems: ['问题分析: 60', '逻辑推理: 56', '创新思维: 58'] },
      { name: '业务能力', score: 52, subItems: ['业务理解: 54', '专业知识: 50', '实践应用: 52'] }
    ],
    evidences: [
      { ability: '学习能力', behavior: '部分环节存在网络异常记录,回答有中断,建议复核或补测。', timestamp: '00:05:30', segment: 'learning-task-1' }
    ]
  },
  {
    id: '7',
    name: '孙浩',
    position: '运营专员',
    status: 'transfer',
    matchRange: '65-75%',
    riskFlags: [],
    interviewDate: '2025-01-12',
    score: 72,
    email: 'sunhao@example.com',
    phone: '133****7788',
    abilities: [
      { name: '学习能力', score: 74, subItems: ['信息理解速度: 76', '核心要点提取: 72', '表达重组能力: 74'] },
      { name: '自驱力', score: 78, subItems: ['主动性: 79', '目标设定: 77', '自我管理: 78'] },
      { name: '执行力', score: 72, subItems: ['任务完成度: 74', '时间管理: 70', '结果导向: 72'] },
      { name: '批判性思维', score: 68, subItems: ['问题分析: 70', '逻辑推理: 66', '创新思维: 68'] },
      { name: '业务能力', score: 72, subItems: ['业务理解: 74', '专业知识: 70', '实践应用: 72'] }
    ],
    evidences: [
      { ability: '自驱力', behavior: '有运营侧主动拉齐资源、推动活动的经历描述。', timestamp: '00:13:40', segment: 'motivation-task-1' },
      { ability: '业务能力', behavior: '对增长与留存有清晰认知,更适合运营/增长岗位。', timestamp: '00:26:50', segment: 'business-task-1' }
    ]
  },
  {
    id: '8',
    name: '周敏',
    position: '产品经理',
    status: 'recommend',
    matchRange: '82-92%',
    riskFlags: [],
    interviewDate: '2025-01-12',
    score: 90,
    email: 'zhoumin@example.com',
    phone: '132****3344',
    abilities: [
      { name: '学习能力', score: 92, subItems: ['信息理解速度: 94', '核心要点提取: 90', '表达重组能力: 92'] },
      { name: '自驱力', score: 88, subItems: ['主动性: 89', '目标设定: 87', '自我管理: 88'] },
      { name: '执行力', score: 90, subItems: ['任务完成度: 92', '时间管理: 88', '结果导向: 90'] },
      { name: '批判性思维', score: 88, subItems: ['问题分析: 89', '逻辑推理: 87', '创新思维: 88'] },
      { name: '业务能力', score: 88, subItems: ['业务理解: 90', '专业知识: 86', '实践应用: 88'] }
    ],
    evidences: [
      { ability: '学习能力', behavior: '快速提炼材料要点并联系实际产品场景,表达结构清晰。', timestamp: '00:02:30', segment: 'learning-task-1' },
      { ability: '业务能力', behavior: '对B2B留存与激活的分析有框架、有数据意识,建议优先进入二面。', timestamp: '00:30:00', segment: 'business-task-1' }
    ]
  }
];
