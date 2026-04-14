# Navifox Pages

本项目是一个基于 pnpm Workspace 的 Monorepo，内含多个子项目。

## 开始

使用 `pnpm install` 安装所有依赖，然后参见下文[工作流](#工作流)一节运行本地开发服务，例如 `pnpm run dev:docs` 。

## 结构

### 技术栈

整个项目的技术栈是：

- Node.js 22
- TypeScript
- Tailwind CSS 4
- Vue 3.5
- Vite
- Rolldown

部分子项目所用的技术栈是：

- Vue Router

### 仓库结构

- `navifox-pages/`，项目本体（仓库整体），俗称“**大仓**”。
  - `apps/`，存放负责具体业务的子项目。
    - `docs/`，存放文档相关资料与链接的网站。
    - `refs/`，存放一些 CheatSheet 的网站。
    - `www/`，Navifox Pages 主页。
  - `packages/`，存放可公开的共享子包。
  - `internal/`，存放内部共享子包。
    - `constants/`，存放全局常量。
    - `styles/`，存放全局样式及字体。
    - `tsconfig/`，存放共享 `tsconfig` 配置。
    - `types/`，存放全局类型定义。
    - `ui/`，存放共享UI，包括 shadcn 等组件。
    - `utils/`，存放共享工具。
  - `scripts/`，存放仓库级别的脚本。
  - `.nvmrc`，存放协作时统一采用的 Node.js 版本号。
  - `.oxfmtrc.json`，oxfmt 的[配置](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)。
  - `.syncpackrc.ts`，[SyncPack](https://syncpack.dev/config/syncpackrc/) 的配置文件。
  - `navifox.code-workspace`，Visual Studio Code 工作区配置文件，可以直观呈现项目结构。不过不要直接打开这个工作区，而是复制到
    `navifox-pages.code-workspace` 或其它你喜欢的名称，再打开新复制的这个工作区。

约定所有子项目都直接放在 `./apps/`、`./packages/` 或 `./internal/`
目录下。项目本身不大，这样平铺方便查找和日常管理。

### `package.json`

- 所有子项目的 `name` 约定以 `@navifox/<NAME>` 的格式来命名。
- 除了 `./packages/` 之外的所有子项目 `private` 字段值固定为 `true` 。

## 工作流

> 本节提到的绝大部分命令都应当（默认）在项目根目录下执行。

### 运行、构建、预览

对于负责具体业务的子项目，以 `www` 子项目为例：

```bash
pnpm run dev:www      # 运行子项目
pnpm run build:www    # 构建子项目
pnpm run preview:www  # 预览构建产物
```

其它子项目不能直接运行和预览的方法，也无须执行构建。

执行 `pnpm run build` 可以一次性构建所有（能构建的）子项目。

理论上可以 `pnpm run dev` 和 `pnpm run preview`，如果有需要的话只需模仿 `pnpm run build`
的命令新增即可，不过同时运行多个子项目会占用不同的端口，本项目不常用，所以不提供这两条命令。

### 添加子项目

直接在 `./apps/`、`./packages/` 或 `./internal/`
下创建普通项目，并适当整理依赖即可。依赖安装完成后也是需要在根目录执行
`pnpm run deps:migrate` 来迁移到 `pnpm-workspace.yaml`。

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

如果要迁移子项目位置，或者依赖出现了难以解决而古怪的错误，可以执行 `pnpm run deps:reinstall`
来重新安装大仓以及子项目的所有依赖（包括第三方包和仓库内的子项目）。

### 迁移

只要是涉及到依赖的增删，除非是重新安装，那么不管是子项目的还是仓库整体的，在全部完成后，都要执行
`pnpm run deps:migrate` 来迁移到 `pnpm-workspace.yaml`。

### 检查依赖版本一致性

对于人类与妖灵而言，可以在根目录执行 `pnpm run deps:list`
来查看所有依赖与分布情况以及问题所在；而如果是 AI、Agent
或类似工具，则只需要执行 `pnpm run deps:lint` 并判断
exit code 即可，非零的值表示需要执行修复。

### 修复依赖版本一致性

执行 `pnpm run deps:fix` 即可，详情参见 [`syncpack fix`](https://syncpack.dev/command/fix/)。

### 检查依赖版本

检查哪些依赖有新版本可用（不修改文件）可以执行
`pnpm run deps:check`，这能用颜色标记版本号变化情况以及新旧版本的发布时间。

根据 [SemVer](https://semver.org/lang/zh-CN/) 的定义，版本号 `x.y.z`
代表 `major.minor.patch`，这条命令会列出每个层面的变动数量，并且使用不同颜色表示，例如
`6 minor, 3 patch` 表示涉及到 6 个小版本更新、3 个补丁更新、不涉及大版本更新。

### 更新依赖版本

直接执行 `pnpm run deps:update` 会出现命令行交互，用于手动选择更新哪些依赖。

如果只需更新补丁层面的更新，执行 `pnpm run deps:update:patch`；
如果需要更新小版本更新及补丁更新，执行 `pnpm run deps:update:minor`；
如果要更新全部，执行 `pnpm run deps:update:all`。

务必慎重执行全部更新！

### 格式化 `package.json`

如果需要格式化 `package.json`，尤其是根字段以及
`scripts` 值的排序，可以执行 `pnpm run deps:format`。
