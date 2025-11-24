# PixelVerse Chat - 像素艺术 AI 聊天客户端

<div align="center">
  <h1>🎮✨ PixelVerse Chat 🎨🚀</h1>
  <p>一个精美的像素艺术风格 AI 聊天客户端</p>
</div>

## ✨ 特色功能

- 🎨 **精美的像素艺术 UI** - 支持 5 种主题（日间/夜间/庆典/赛博/月光）
- 🌍 **多语言支持** - 中文/英文/日文完整国际化
- 🤖 **灵活的 LLM 配置** - 支持多种 LLM 提供商统一接口
- 🎭 **互动吉祥物** - 多彩表情和动画效果
- 🎮 **隐藏彩蛋** - Konami Code 彩虹模式
- ⚡ **ACE 智能体工作流** - 专业的开发工作流支持

---

## 🏗️ 架构总览

### 技术栈
- **前端框架**: React 19.2.0 + TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **UI 库**: 自定义像素风格组件系统
- **图标库**: Lucide React 0.554.0
- **Markdown 支持**: react-markdown 8.0.7 + remark 插件生态

### 核心特性
1. **模块化架构** - 清晰的组件分层和服务抽象
2. **主题系统** - 5 种预设主题，支持动态切换
3. **国际化** - 完整的多语言支持体系
4. **LLM 集成** - 支持多种 LLM 提供商的统一接口
5. **实时交互** - 流式响应和动画效果

---

## 📦 模块结构

```
Pixel-Client/
├── components/          # UI 组件模块（像素风格组件库）
│   ├── PixelUI.tsx      # 基础 UI 组件
│   ├── ModelManager.tsx # 模型管理组件
│   ├── Chat.tsx         # 聊天界面组件
│   └── Mascot.tsx       # 吉祥物组件
├── services/           # 服务层模块（LLM 抽象层）
│   └── llmService.ts   # LLM 服务统一接口
├── types.ts            # TypeScript 类型定义
├── constants.ts        # 常量和配置
└── vite.config.ts      # Vite 构建配置
```

---

## 🚀 快速开始

### 环境要求
- Node.js (推荐 v18+)
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 配置环境变量（可选）
```bash
echo "VITE_API_KEY=your_api_key" > .env.local
echo "VITE_API_BASE_URL=http://localhost:12345" >> .env.local
```

*注：本项目通过 ApexBridge 统一接入 LLM 服务，需在 `.env` 文件中配置您的 API 密钥*

### 启动开发服务器
```bash
npm run dev
```

应用将在 `http://localhost:3000` 运行

---

## 📜 可用脚本

```json
{
  "dev": "启动开发服务器",
  "build": "构建生产版本",
  "preview": "预览构建结果"
}
```

---

## 🎨 主题系统

PixelVerse Chat 提供 5 种精美主题：

- ☀️ **日light** - 明亮清新的日间模式
- 🌙 **Night** - 护眼舒适的夜间模式
- 🎉 **Celebration** - 充满活力的庆典主题
- 🌐 **Cyber** - 未来感十足的赛博朋克风格
- 🌕 **Moonlight** - 优雅神秘的月光主题

所有主题都遵循像素艺术美学，确保一致的视觉体验。

---

## 🌐 国际化

支持三种语言：
- 🇨🇳 简体中文
- 🇺🇸 英文
- 🇯🇵 日文

所有 UI 文本均已翻译，可根据用户偏好动态切换。

---

## 🤖 LLM 集成

通过统一的 `llmService.ts` 接口，支持集成多种 LLM 提供商：

- **Google Gemini** - 默认集成
- **OpenAI GPT** - 支持 GPT-3.5/4
- **Anthropic Claude** - 支持 Claude 系列
- **自定义 API** - 可扩展的适配器模式

配置方式简单直观，支持流式响应和实时交互。

---

## 🎭 吉祥物系统

PixelVerse Chat 配备了可爱的像素风格吉祥物：
- 多种表情动画（开心、思考、打字中等）
- 8 FPS 像素动画风格
- 与聊天状态同步互动
- 增强用户体验的情感连接

---

## 🎮 隐藏彩蛋

输入 Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) 激活彩虹模式 🌈

---

## 🤖 ACE 智能体工作流

项目完整集成 ACE（自适应协作引擎）工作流：
- **研究阶段** - 代码库分析和需求理解
- **构思阶段** - 架构设计和方案制定
- **计划阶段** - 任务拆解和进度管理
- **执行阶段** - 代码实现和功能开发
- **优化阶段** - 性能调优和代码重构
- **评审阶段** - 代码审查和质量保证

所有开发任务都遵循这一专业工作流，确保代码质量和项目可维护性。

---

## 🧪 测试策略

⚠️ **当前缺失测试框架**

建议添加的测试配置：
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage"
  }
}
```

### 测试覆盖目标
- 组件渲染测试
- 状态管理逻辑测试
- 服务层功能测试
- 集成测试

---

## 📋 编码规范

### TypeScript 规范
- 严格类型检查 ✅
- 接口优先设计 ✅
- 避免 `any` 类型 ✅
- 使用枚举管理常量 ✅

### 组件设计规范
- 函数式组件 + Hooks ✅
- Props 接口明确定义 ✅
- 可访问性支持 ✅
- 主题适配 ✅

### 文件命名规范
- 组件文件: `PascalCase.tsx` ✅
- 工具文件: `camelCase.ts` ✅
- 类型文件: `camelCase.ts` ✅
- 常量文件: `UPPER_SNAKE_CASE.ts` ✅

---

## 🆕 新功能开发指南

### 添加新主题
在 `constants.ts` 中扩展 `THEME_STYLES` 常量

### 新增语言
在 `TRANSLATIONS` 中添加语言条目

### 集成新 LLM
在 `services/llmService.ts` 中添加适配器

### 创建新组件
基于 `PixelUI` 组件系统扩展，保持像素风格一致性

---

## ⚠️ 注意事项

- 保持像素艺术的视觉一致性
- 所有状态变更考虑主题切换影响
- 吉祥物动画需要保持 8 FPS 风格
- 流式响应需要模拟网络延迟效果
- 新增文本需添加多语言翻译

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<div align="center">
  <p>🐱 用 ❤️ 和像素艺术制作</p>
  <p><strong>PixelVerse Chat</strong> - 让聊天变得更有趣！✨</p>
</div>
