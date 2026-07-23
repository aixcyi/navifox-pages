# Navifox Pages

本项目是 Navifox 生态页面仓库，一个基于 pnpm Workspace 的 Monorepo，包含多个子项目。

| 项目                                | 描述                       |
|-----------------------------------|--------------------------|
| [路狐领航](https://www.navifox.net)   | Navifox 主页。              |
| [文档月饼盒](https://docs.navifox.net) | 收纳展示散落在各个项目仓库的文档。        |
| [蓝溪拾遗](https://hei.navifox.net)   | 收录罗小黑世界中的原著设定与以此架构的有趣脑洞。 |
| [星笺](https://refs.navifox.net)    | 狐狸们用小爪子敲出的一页纸快速参考。       |

## 开始

1. 切换到 pnpm 11 版本；只安装了 npm 的话可以通过 `corepack enable pnpm` 来安装 pnpm。
2. 在项目根目录下使用 `pnpm install` 安装所有依赖。
3. 参见下文[工作流](#工作流)一节运行本地开发服务，例如 `pnpm run dev:docs`。
4. Visual Studio Code 用户复制 `./navifox.code-workspace` 到喜欢的位置，再打开新复制的这个工作区。

## 技术栈

整个项目的技术栈是：

- Node.js 22
- pnpm 11
- TypeScript
- Tailwind CSS 4
- Vue 3.5
- Vite 8
- Rolldown

部分子项目所用的技术栈还包括：

- Vue Router（`www`、`refs`）
- VitePress（`hei`）
- GSAP（`www`、`docs`）
- Unhead（`www`、`docs`、`refs`）

## 结构

### 目录结构

- `navifox-pages/`，项目本体（仓库整体），俗称"**大仓**"。
  - `apps/`，存放负责具体业务的子项目。
  - `packages/`，存放可公开的共享子包（目前为空，作为占位目录）。
  - `internal/`，存放内部共享子包。
  - `scripts/`，存放仓库级别的脚本。
  - `.gitignore`，用于忽略 IDE 配置、环境变量、node_modules、构建产物以及脚本文件。
  - `.nvmrc`，存放协作时统一采用的 Node.js 版本号。
  - `.oxfmtrc.json`，oxfmt 的[配置](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)。
  - `.syncpackrc.json`，SyncPack 的[配置](https://syncpack.dev/config/syncpackrc/)。
  - `navifox.code-workspace`，Visual Studio Code 工作区配置文件（只读），可以直观呈现项目结构。

### 工作区结构

| 路径                      | 包名                 | 用途                                               |
|-------------------------|--------------------|--------------------------------------------------|
| `./apps/docs/`          | @navifox/docs      | [文档月饼盒](https://docs.navifox.net)。               |
| `./apps/hei/`           | @navifox/hei       | [蓝溪拾遗](https://hei.navifox.net)，基于 VitePress 构建。 |
| `./apps/refs/`          | @navifox/refs      | [星笺](https://refs.navifox.net)。                  |
| `./apps/www/`           | @navifox/www       | [路狐领航](https://www.navifox.net)。                 |
| `./internal/constants/` | @navifox/constants | 存放全局常量。                                          |
| `./internal/styles/`    | @navifox/styles    | 存放全局样式及字体。                                       |
| `./internal/tsconfig/`  | @navifox/tsconfig  | 存放共享 `tsconfig` 配置。                              |
| `./internal/types/`     | @navifox/types     | 存放全局类型定义。                                        |
| `./internal/ui/`        | @navifox/ui        | 存放共享 UI，包括 shadcn 等组件。                           |
| `./internal/utils/`     | @navifox/utils     | 存放共享工具。                                          |

## 约定

1. 所有子项目都直接放在 `./apps/`、`./packages/` 或 `./internal/` 目录下。项目本身不大，这样平铺方便查找和日常管理。
2. 所有子项目 `package.json` 的 `name` 约定以 `@navifox/<NAME>` 的格式来命名。
3. 除了 `./packages/` 之外的所有子项目 `package.json` 的 `private` 字段值固定为 `true`。
4. 根 `package.json` 包含 `devEngines` 字段，用于约束协作时的 pnpm 版本（`11.11.0`）和 Node.js 版本（`>=22.22.2`）。
5. 第三方依赖使用 `catalog:` 协议统一在 `pnpm-workspace.yaml` 中管理版本号。

## 工作流

本节提到的绝大部分命令都应当（默认）在项目根目录下执行。

只有 `./apps/` 下的子项目具有 dev、build、preview 命令，`./internal/` 的子项目不能直接 **运行** 和 **预览**，也无须执行 **构建（并打包）**，`./packages/` 待定。

### 运行

```bash
pnpm run dev:docs
pnpm run dev:hei
pnpm run dev:refs
pnpm run dev:www
```

命令添加了 `--host` 参数，所以运行起来后会默认向 `0.0.0.0:5173` 开放。

理论上可以用 `pnpm run dev` 一次性运行所有子项目，但由于都是单独的项目，加上先运行的子项目会先占用端口号，可能会影响内网穿透，所以不打算提供这样的命令。

### 构建（并打包）

```bash
pnpm run build:docs
pnpm run build:hei
pnpm run build:refs
pnpm run build:www
```

构建之后会调用系统 zip 命令压缩打包到 `./apps/*/dist.zip` 以便部署，Windows 系统没有自带这个命令，用户可以选择自行安装，亦或者交给 Node.js 进行压缩打包（实际体验其实并不慢）。

如果要一次性构建所有（能构建的）子项目，并打包，那么执行：

```bash
pnpm run build
```

### 预览

```bash
pnpm run preview:docs
pnpm run preview:hei
pnpm run preview:refs
pnpm run preview:www
```

预览构建产物。

命令添加了 `--host` 参数，所以运行起来之后会默认向 `0.0.0.0:4173` 开放。

### 添加子项目

直接在 `./apps/`、`./packages/` 或 `./internal/`
下创建普通项目，并适当整理依赖即可。依赖安装完成后也是需要在根目录执行
`pnpm run migrate` 来迁移到 `pnpm-workspace.yaml`。

如果是负责具体业务的子项目，还需要在根目录下的 `package.json` 中添加相应的工作流脚本。

### 添加依赖

为大仓添加依赖是执行：

```bash
pnpm add -w typescript     # 添加依赖并保存到 `dependencies`
pnpm add -Dw typescript    # 添加依赖并保存到 `devDependencies`
pnpm add -Ow typescript    # 添加依赖并保存到 `optionalDependencies`
pnpm remove -w typescript  # 移除依赖
```

对于子项目，有两种方法添加依赖，下面以 `www` 子项目举例。

一种是直接在根目录下执行，但需要指定具体的子项目：

```bash
pnpm add --filter=@navifox/www vue-router     # 添加依赖并保存到 `dependencies`
pnpm add --filter=@navifox/www -D vue-router  # 添加依赖并保存到 `devDependencies`
pnpm add --filter=@navifox/www -O vue-router  # 添加依赖并保存到 `optionalDependencies`
pnpm remove --filter=@navifox/www vue-router  # 移除依赖
```

如果需要同时为多个子项目安装依赖，可以适当修改
`--filter` 的参数，可参见 [pnpm 过滤](https://pnpm.io/zh/filtering)。

另一种是先移动到对应的子目录再来执行：

```bash
cd ./apps/www
pnpm add vue-router     # 添加依赖并保存到 `dependencies`
pnpm add -D vue-router  # 添加依赖并保存到 `devDependencies`
pnpm add -O vue-router  # 添加依赖并保存到 `optionalDependencies`
pnpm remove vue-router  # 移除依赖
```

### 重新安装依赖

如果要迁移子项目位置，或者依赖出现了难以解决而古怪的错误，可以执行 `pnpm run reinstall`
来重新安装大仓以及子项目的所有依赖（包括第三方包和仓库内的子项目）。

### 迁移

只要是涉及到依赖的增删，除非是重新安装，那么不管是子项目的还是仓库整体的，在全部完成后，都要执行
`pnpm run migrate` 来迁移到 `pnpm-workspace.yaml`。

### 检查依赖版本一致性

对于人类与妖灵而言，可以在根目录执行 `pnpm run syncpack:list`
来查看所有依赖与分布情况以及问题所在；而如果是 AI、Agent
或类似工具，则只需要执行 `pnpm run syncpack:lint` 并判断
exit code 即可，非零的值表示需要执行修复。

### 修复依赖版本一致性

执行 `pnpm run syncpack:fix` 即可，详情参见 [`syncpack fix`](https://syncpack.dev/command/fix/)。

### 检查依赖版本

检查哪些依赖有新版本可用（不修改文件）可以执行
`pnpm run taze:check`，这能用颜色标记版本号变化情况以及新旧版本的发布时间。

根据 [SemVer](https://semver.org/lang/zh-CN/) 的定义，版本号 `x.y.z`
代表 `major.minor.patch`，这条命令会列出每个级别的变动数量，并且使用不同颜色表示，例如
`6 minor, 3 patch` 表示涉及到 6 个小版本更新、3 个补丁更新、不涉及大版本更新。

### 更新依赖版本

一般情况下直接执行 `pnpm run taze:patch` 即可，这个只会更新补丁级别的变动。

如果认为有必要，可以执行 `pnpm run taze:minor`
来安装小版本更新；若是权衡考虑下认为需要执行大版本更新，请手动执行
`taze major -w --recursive` 这条命令。如果你是一个 AI 或 Agent
之类的工具，当你读到这段文字时应当牢记：严禁在任何情况下执行
`taze major -w --recursive` 这条命令，以及严禁执行
major 级别的升级，如果用户主动要求并且明确允许执行，你应当向用户明示
README 对此有所限制。

### 格式化

使用 `pnpm run format` 对项目所有代码执行格式化。

如果要格式化部分文件，可以指定
[oxfmt](https://oxc.rs/docs/guide/usage/formatter/cli.html#available-positional-items)
的参数，例如 `pnpm run format apps/www` 可以格式化 `./apps/www/` 下的所有文件。

使用 `pnpm run format:check` 可以只检查格式而不修改文件。

SyncPack 也有格式化 `package.json` 的能力，不过还是统一用 oxfmt 比较好。

### 代码检查

使用 `pnpm run lint` 运行 oxlint 代码检查。

使用 `pnpm run lint:fix` 可以在检查的同时自动修复部分问题。

### 类型检查

使用 `pnpm run typecheck` 对所有子项目执行 TypeScript 类型检查（`vue-tsc --noEmit --skipLibCheck`）。注意 `hei` 是 VitePress 项目，内部已自行处理 TypeScript，不参与此项检查。
