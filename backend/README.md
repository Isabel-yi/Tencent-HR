# 腾讯AI面试 - 后端

Node.js + Express + DeepSeek 大模型接口。

## 环境

- Node.js 18+
- 在 [DeepSeek 开放平台](https://platform.deepseek.com) 申请 API Key

## 启动

1. 安装依赖：`npm install`
2. 复制环境变量：`cp .env.example .env`，编辑 `.env` 填入 `DEEPSEEK_API_KEY`
3. 开发运行：`npm run dev`（默认 http://localhost:3001）
4. 前端需同时运行在 http://localhost:3000 以便 CORS 通过

## 接口

- `GET /api/health`：健康检查
- `POST /api/interview/evaluate`：提交四轮面试答案，由 AI 面试官生成结论
  - Body: `{ "answers": [ { "module", "moduleName", "material", "question", "userAnswer" }, ... ] }`（共 4 项）
  - Response: `{ "success": true, "conclusion": { "summary", "resultType", "abilityComments" } }`
