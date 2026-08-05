---
title: pip 额外依赖
outline: deep
createAt: 2025-04-11 14:53
expires: 1096
tags:
    - 包管理器
    - AIGC
excerpt:
    pip 支持通过方括号语法（如 `redis[hiredis]`）安装带有可选依赖项的包，这一功能被称为
    Extras 或 Optional Dependencies。本文介绍了该功能的引入时间，并给出了查看具体依赖的方法。
---

> [!WARNING] AIGC 手工审查事项
> 1. [redis-py](https://github.com/redis/redis-py) 项目的
>    [pyproject.toml](https://github.com/redis/redis-py/blob/master/pyproject.toml)
>    文件确实包含 `[project.optional-dependencies]` 相关配置。
> 2. [PEP 508](https://peps.python.org/pep-0508/) 确实为包依赖关系的提案，并找到
>    [extras](https://peps.python.org/pep-0508/#extras) 部分的描述。

> [!INFO] 提示词
> 曾经 pip 只能安装单个库，就像 `pip install redis` 这样，但后来它可以像 `pip install "redis[hiredis]"`
> 这样一次性安装多个库，我想知道这是从哪个 Python 版本或者具体什么时候开始的？是否有文档可供参考？从哪里可以知道
> `"redis[hiredis]"` 对应了哪些具体的包以及它们的依赖关系、依赖版本号？

## 功能引入时间

- Python 打包工具（如 `setuptools`） 很早就支持在 `setup.py` 中定义
  `extras_require`，允许开发者声明可选依赖项。这一机制并非
  `pip` 独有，而是由 Python 打包生态（如 `setuptools`、**PEP 508**）提供支持。
- **pip 的方括号语法** 是对这一功能的直接调用，具体支持时间可以追溯到
  `pip` 的早期版本（至少从 pip 1.0 时代就已存在）。但更规范的文档化和广泛使用是在
  **PEP 508**（2015年提出，2016年正式采纳）之后，该提案明确了依赖声明的语法标准，包括可选依赖的格式。

## 如何查看依赖项

要了解 `redis[hiredis]` 包含的具体包及其依赖关系，可以通过以下方式：

### 1、直接查看包的元数据

运行以下命令查看包的详细信息（以 redis 为例）：

```bash
pip show redis
```

输出中会包含 `Requires` 和 `Required-by` 字段，但可选依赖需要进一步检查。

### 2、查看包的 `setup.py` 或 `pyproject.toml`

- 访问包的源代码（如 GitHub 仓库）或文档，查找 `extras_require` 部分。  
  例如 redis-py 的官方文档会明确列出可选依赖项。
- 对于已安装的包，可以通过 `pip inspect`（较新版本）或第三方工具（如 pipdeptree）分析依赖树：  
  ```bash
  pip install pipdeptree
  pipdeptree --packages redis
  ```

### 3、通过 `pip install` 的 `--dry-run` 模式

模拟安装并观察依赖解析：

```bash
pip install --dry-run "redis[hiredis]"
```

这会输出将要安装的包及其版本。
