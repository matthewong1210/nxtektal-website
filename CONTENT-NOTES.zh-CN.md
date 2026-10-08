# NXTektal Systems 网站交接说明

## 2026-10 叙事更新：Site Brain + 作业机器人

本轮将官网定位从"面向自主高尔夫设施的智能层"改为：

> NXTektal 正在开发用于户外设施作业的现场大脑（Site Brain）和机器人，首先从高尔夫设施切入。

首页叙事顺序（自上而下）：

1. 公司定位与客户价值：Hero + 客户调研数据条。
2. 客户目标与现场问题：何时收球的判断、设备之间的人工交接、供球风险与异常处理，一条现场观察，以及为什么先从练习场切入。
3. 系统如何工作：Sense → Plan → Coordinate → Execute → Verify；管理者、NXTektal 机器人、传感器与既有设备各自参与的环节；管理者掌握目标、规则和审批。
4. 第一条工作流：练习场收球、返回、交接、清洗补给、结果确认；接入既有设备，兼容性按场地评估。
5. 软件与机器共同发展：Site Brain 与面向具体任务的机器并行开发；仿真器、架构分层（与 nxtektal-systems 代码库的设计边界对应）、管理者看板概念。
6. 运营经济性（ROI 计算器）。
7. 路线：高尔夫设施内的后续作业与更长期的户外设施方向——仅练习场供球流程在开发中，其余为方向而非产品。
8. 当前进展与试点入口：各条线的真实状态，然后是 Assess → Integrate → Validate。
9. 创始团队与最终 CTA。

用词规则：

- 核心定位统一使用 "site brain and robotic workforce"；不再以 "intelligence layer / execution layer / operating layer" 描述公司。"Full-stack" 仅在技术解释中按需使用。
- 软件统称 **Site Brain**；仿真工具为 **Range Operations Simulator**（真实存在的开发工具）；机器为 **collection robot**（收球机器人）与 **handoff unit**（交接单元），均为 NXTektal 自研；兼容的既有设备共同参与工作流。
- 客户统称 **golf facilities**（球场与独立练习场）；描述具体流程时用 **driving ranges**。
- 迭代机制写成"现场结果指导软件与机器设计的改进"，不写 "improve with every deployment"。
- "Modular" 仅在有明确模块化硬件设计依据时使用；共享任务接口不等于硬件模块可互换。
- 状态标签（`app/page.tsx` 的 `buildTracks`、`lib/expansionStages.ts` 的 `EXPANSION_STAGES`、`components/manifesto/IntelligenceSection.tsx` 的状态标签）必须对应各条线的真实进度；路线阶段和 CONCEPT 模块不得写成可交付产品。

待核实事项（本轮按保守措辞处理，见提交说明）：

- "Prototype in development"（收球机器人）依据仓库 `ATTRIBUTIONS.md` 中"真实原型照片"的记录；请确认当前原型状态与对外口径。
- "Facility workflow mapping — IN PROGRESS"、"Pilot site assessments — OPEN" 为对原 "PILOT PREPARATION" 的保守改写；请确认。
- 客户调研数字（30+ / 超过三分之二 / 6）沿用原站，未新增数字。
- 看板示例中的数值（如 "−40 min"、"6 of the last 7 days"）为概念示意，已标注 CONCEPT / illustrative。
- 页脚原标语 "AUTONOMY. INTELLIGENCE. IMPACT." 已替换为定位语 "SITE BRAIN + ROBOTIC WORKFORCE FOR OUTDOOR FACILITIES"；如该标语是必须保留的品牌标识，请告知后恢复。
- 社交分享图 `public/og-image.jpg` 已用真实原型照片（`public/robot/robot-front.jpg`）加新标题重新生成，替换了原图中 "The operating system for autonomous outdoor work" 的旧定位文案；请确认版式，部署后需让社交平台重新抓取。
- HANDOFF 步骤的概念渲染显示"站侧机械臂倾倒球篮"，与文案中"料斗经交接单元转入既有清洗机进料口"的描述机制不同；请确认该渲染是否仍代表当前设计方向。
- Hero 概念影片的生成工具与商用授权条款在 `ATTRIBUTIONS.md` 中仍未记录（沿用前版的待办）。
- 进展模块中 "Facility state and planning rules — WORKING · SIMULATION INPUTS"、"Sensor and equipment interfaces — CONTRACTS · NO LIVE ADAPTER" 依据 nxtektal-systems 仓库 `docs/MILESTONES.md` 与 `.agent/context/deployment.md`：状态契约、确定性建议、Site Runtime 等已合并但仅接入合成数据，无物理适配器。

---

## 早期交接说明（品牌视觉版，2026-08 之前；定位描述已被上文取代）

## 本版定位

这是一版以投资人为第一受众的单页官网。核心目标不是直接销售设备，而是让投资人在一分钟内理解：

1. NXTektal Systems 不是单一捡球机器人制造商；
2. 长期产品是面向受管理户外环境的自主运营系统；
3. 高尔夫是一个可商业化、可逐步扩张的 Physical AI 切入口；
4. 第一款产品足够具体：从练习场球循环开始；
5. 自有机器人是早期执行端，成熟后平台可逐步接入兼容的第三方设备。

## 品牌与视觉系统

本版已经按照提供的品牌参考图，统一为深色、技术感和高端工业风：

- 荧光绿：`#A6E22E`
- 深森林绿：`#1E2F1E`
- 近黑色：`#0D1117`
- 金属灰：`#6B7280`
- 灰白色：`#F5F7F7`
- 字体方向：Inter / 现代无衬线
- 视觉语言：金属渐变、暗色玻璃面板、遥测数据、细网格、荧光绿状态提示
- 已加入新的 NXTektal 概念品牌标识，并同步用于 favicon
- 标语采用：`AUTONOMY. INTELLIGENCE. IMPACT.`

首页右侧机器人和系统界面是原创 SVG 概念视觉，已明确标注 `CONCEPT VISUAL`，不表示现有产品已经完成。获得真实 CAD、原型照片或最终渲染图后，建议优先替换。

## 已经正式替换的品牌信息

- 公司名称：`NXTektal Systems`
- 正式域名：`https://nxtektal.com`
- 网站联系邮箱：`founders@nxtektal.com`
- 页面标题、canonical、Open Graph、robots 和 sitemap 均已使用正式域名

## 上线前必须确认

1. 创建并测试 `founders@nxtektal.com` 邮箱；如果不用该地址，请在 `app/page.tsx` 修改
2. 创始团队姓名、角色、照片与最有说服力的经历
3. 当前进展：概念、原型、测试、LOI、pilot 或付费客户中的真实状态
4. 第一代设备的 CAD、原型照片或明确标注的可信渲染图
5. 可以公开的客户访谈或现场观察数据
6. 融资轮次，以及是否希望在网站上明确写出正在融资
7. 最终确认 Logo 字标和社交媒体分享图（Open Graph image）

## 下一轮最值得增加的内容

- 30–60 秒产品演示视频或交互式工作流动画
- 第一代机器人真实视觉资产
- Pilot 指标：球供应可用率、人工小时减少、人工搬运减少、uptime
- 一个简洁的创始人故事与“为什么是我们”
- 投资人资料入口，例如受控访问的 deck 或 data room

## 最重要的叙事纪律

网站需要始终区分：

- **现在正在构建的第一款产品**
- **高尔夫设施层面的中期平台**
- **公园、校园和城市绿地的长期扩张愿景**

不要把路线图中的未来能力写成已经完成的功能。随着原型和 pilot 产生真实数据，应优先用数字替换概念性表达。
