# NXTektal Systems 网站交接说明

## 2026-10-13 叙事更新：机器人 + 背后的运营系统，先讲工作再讲架构

本轮定位基准句：

> NXTektal is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities.

首页叙事顺序（自上而下）：

1. 公司定位与客户价值：Hero（减少例行作业、协调和检查所需的人工投入，写成目标）+ 客户调研数据条。
2. 客户的反复发生的户外工作（The Work）：练习场收球与交接、割草、喷施与灌溉检查、沙坑与巡检；每项标注 NXTektal 的真实状态（首项开发中 / 下一项待验证未启动 / 更晚方向）。
3. 第一项工作（First Job）："把球捡起来只是最简单的部分"：何时收球的判断、设备间交接、确认与异常；现场观察；八步设计工作流（画面内标注 SIMULATION / CONCEPT）；"开发中范围"与"尚未宣称的完整供球愿景"分栏；三个组件卡片；既有设备接入与机制中立的交接示意图。
4. 系统怎样完成工作：Sense → Decide → Coordinate → Execute → Confirm；谁做什么；自研与选用第三方设备的说明；状态说明。
5. 软件与机器：Site Brain 与任务所需硬件并行；产品改进闭环（record → analyze → improve → test → deliver，是方法不是自学习）；仿真器；架构分层；看板概念。
6. 为什么先做高尔夫：同一场地多项反复作业、已有预算与可定义验收；两个切入点（高尔夫 = 客户切入点，练习场收球 = 第一项产品切入点）；"同一场地不等于同一购买方"写成待验证假设；GCSAA 2024 报告的支出数据附来源与限定。
7. 如何扩展：先交付练习场工作 → 在同一场地验证相邻工作（割草等）→ 把已验证的工作带到条件相近的其他设施；可复用 / 场地专属两栏；按作业拆分的复用假设表（割草、喷施、灌溉检查、巡检运输）；复用必须证明的商业指标（均为目标）；高尔夫之外为更晚方向。
8. ROI 计算器。
9. 当前进展与试点计划。
10. 创始团队与最终 CTA。

用词规则（本轮）：

- 定位统一为 "robots and the operating system behind them, for outdoor work, starting with golf facilities"；不再使用 "site brain and robotic workforce"、"intelligence layer / execution layer / operating layer" 描述公司。Site Brain 作为软件名称，在讲清工作之后再出现。
- Handoff 机制中立："Collected balls return to a handoff point for transfer into the range's existing washer intake. The workflow requires transfer confirmation before collection resumes." 用 collected balls / collected load，不用 hopper、basket；不把站侧机械臂、可拆球篮、机器人自举升、滑槽、输送带中的任何一种写成既定结构；不用 "handoff unit"。机械臂举篮的概念画面保留，画面内标注 "CONCEPT · TRANSFER MECHANISM UNDER DEVELOPMENT"，图注 "Concept visualization. Transfer mechanism under development."
- 两种闭环分开：业务闭环（Sense → Decide → Coordinate → Execute → Confirm）与产品改进闭环（record → analyze → improve → test → deliver）。后者是开发方法；不声称产品自动学习、每次运行必然变强或拥有自己的机器人基础模型。
- 自研与选用：既开发任务所需的软件与硬件，也选用合适的第三方设备；不暗示所有设备自制或所有第三方设备已兼容。
- 扩展表述："较高复用潜力、较低增量适配成本"，不用 "seamless"；收球机构不能割草；割草、喷施、灌溉按证据标注为待验证或方向。
- 画面标注：仿真 / 概念渲染 / 概念动画 / 真实照片在画面内或图注中区分；概念渲染不作为部署证据。
- 保留 PR #37 的手机视频兼容修复（轻量移动端编码、静音内联自动播放、封面优先、可触达的 "Play background video" 回退、减少动态效果时不加载视频）。

待创始人确认的事实与工程决策：

1. 交接机构：网站按"机构仍在开发、未选定"处理。若已有较新的设计定案（站侧机械臂 / 球篮 / 机器人自举升 / 滑槽），请告知以更新文案、示意图与渲染标注。
2. 容器类型：文案已改为 collected balls / collected load；若料斗（hopper）已确定为容器形式，可恢复该词。
3. GCSAA 数据（美国 18 洞球场 2023 年平均维护支出约 100 万美元、人工约 56.8 万美元）按你的来源引用并加限定；发布前请核对报告页码与口径。
4. 练习场合作是否能进入养护部门（不同负责人 / 预算 / 验收）：已写成待验证假设；如有实际客户证据可替换。
5. "Facility workflow mapping — PILOT PREPARATION"、"Pilot site assessments — OPEN" 沿用上一轮，请确认。
6. 创始人简介仅重排已有事实的重点（客户开发 / 机器人工程 / 制造交付），未新增履历；请确认表述。
7. Hero 概念影片的生成工具与商用授权在 `ATTRIBUTIONS.md` 中仍未记录（沿用前版待办）。
8. 社交分享图已用真实原型照片 + 新标题重新生成；部署后需让社交平台重新抓取。

---

## 上一轮（2026-10-08）叙事更新：Site Brain + 作业机器人（定位与 handoff 表述已被上文取代）

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
- 〔已废除 2026-10-13：不再使用 "handoff unit"，改为 handoff point / collected balls，见顶部规则〕软件统称 **Site Brain**；仿真工具为 **Range Operations Simulator**（真实存在的开发工具）；机器为 **collection robot**（收球机器人）与 ~~handoff unit（交接单元）~~，均为 NXTektal 自研；兼容的既有设备共同参与工作流。
- 客户统称 **golf facilities**（球场与独立练习场）；描述具体流程时用 **driving ranges**。
- 迭代机制写成"现场结果指导软件与机器设计的改进"，不写 "improve with every deployment"。
- "Modular" 仅在有明确模块化硬件设计依据时使用；共享任务接口不等于硬件模块可互换。
- 状态标签（`lib/firstJob.ts` 的 `BUILD_TRACKS`〔2026-10-13 从 `app/page.tsx` 移入〕、`lib/expansionStages.ts` 的 `EXPANSION_STAGES`、`components/manifesto/IntelligenceSection.tsx` 的状态标签）必须对应各条线的真实进度；路线阶段和 CONCEPT 模块不得写成可交付产品。

待核实事项（本轮按保守措辞处理，见提交说明）：

- "Prototype in development"（收球机器人）依据仓库 `ATTRIBUTIONS.md` 中"真实原型照片"的记录；请确认当前原型状态与对外口径。
- "Facility workflow mapping — IN PROGRESS"、"Pilot site assessments — OPEN" 为对原 "PILOT PREPARATION" 的保守改写；请确认。
- 客户调研数字（30+ / 超过三分之二 / 6）沿用原站，未新增数字。
- 看板示例中的数值（如 "−40 min"、"6 of the last 7 days"）为概念示意，已标注 CONCEPT / illustrative。
- 页脚原标语 "AUTONOMY. INTELLIGENCE. IMPACT." 已替换为定位语 "SITE BRAIN + ROBOTIC WORKFORCE FOR OUTDOOR FACILITIES"；如该标语是必须保留的品牌标识，请告知后恢复。
- 社交分享图 `public/og-image.jpg` 已用真实原型照片（`public/robot/robot-front.jpg`）加新标题重新生成，替换了原图中 "The operating system for autonomous outdoor work" 的旧定位文案；请确认版式，部署后需让社交平台重新抓取。
- HANDOFF 步骤的概念渲染显示"站侧机械臂倾倒球篮"，与文案中"料斗经交接单元转入既有清洗机进料口"的描述机制不同；请确认该渲染是否仍代表当前设计方向。〔2026-10-13 更正：逐帧核对后，渲染中的机械臂安装在机器人本体上，并非站侧；文案与 alt 已改为机制中立并标注 "one option, under development"〕
- Hero 概念影片的生成工具与商用授权条款在 `ATTRIBUTIONS.md` 中仍未记录（沿用前版的待办）。
- 〔2026-10-13：这两条状态词已统一为 "WORKING · SIMULATION ONLY" 与 "DESIGNED · NOT CONNECTED"，依据不变〕进展模块中 "Facility state and planning rules — WORKING · SIMULATION INPUTS"、"Sensor and equipment interfaces — CONTRACTS · NO LIVE ADAPTER" 依据 nxtektal-systems 仓库 `docs/MILESTONES.md` 与 `.agent/context/deployment.md`：状态契约、确定性建议、Site Runtime 等已合并但仅接入合成数据，无物理适配器。

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
