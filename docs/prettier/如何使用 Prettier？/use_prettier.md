# 如何使用 Prettier？

## 安装与配置

### 安装 prettier

<CodeGroup>
  <CodeGroupItem title="npm">

```bash:no-line-numbers
npm install --save-dev --save-exact prettier
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add --dev --exact prettier
```

  </CodeGroupItem>
</CodeGroup>

### 配置 .prettierrc.json

Prettier 提供了一些格式选项，我们可以在配置文件中配置，例如：

```json:no-line-numbers
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "all"
}
```

关于 Prettier 的更多配置，详见[官方文档](https://prettier.io/docs/en/options.html)。

### 配置 .prettierignore

该文件让 Prettier 知道哪些文件不需要格式化，例如：

```:no-line-numbers
# Ignore artifacts:
build
coverage
```

### 运行 prettier

现在，我们可以运行 Prettier 了，例如：

<CodeGroup>
  <CodeGroupItem title="npm">

```bash:no-line-numbers
npx prettier --write .
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn prettier --write .
```

  </CodeGroupItem>
</CodeGroup>

运行 `prettier --write .` 会格式化所有内容，这是我们最常用的方法。关于 Prettier 的更多命令，详见[官方文档](https://prettier.io/docs/en/cli.html)。

### 防止其他 Linter 工具和 Prettier 冲突

Linter 工具通常会包含风格规则，它们可能与 Prettier 冲突。如果项目中使用了 ESLint，请安装 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)，将它放在其他规则后面，它会关闭所有不必要或可能与 Prettier 冲突的 ESLint 规则。

```json:no-line-numbers
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
    "prettier"
  ]
}
```

如果项目中还使用了其他 Linter 工具，请参考[该文档](https://prettier.io/docs/en/integrating-with-linters.html)进行配置。

## 配置编辑器

以 VSCode 为例：安装扩展插件 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ，然后在设置中将其设置为默认格式化程序：

```json:no-line-numbers
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

现在我们运行 Prettier 不需要直接使用命令了，按下编辑器的格式化快捷键（Alt + Shift + F）就 OK 了。当然也可以设置让编辑器在某些时刻自动触发格式化，比如在保存时格式化文件：

```json:no-line-numbers
{
  "editor.formatOnSave": true
}
```

## 配置 Git hooks

为了确保团队成员提交的代码都按照预期格式化，我们可以借助预提交工具在文件提交前运行 Prettier。[这里](https://prettier.io/docs/en/precommit.html)提供了几种不同的方式来配置这个功能，我们选择其中一种即可，例如：

```bash:no-line-numbers
npx mrm@2 lint-staged
```

该命令将安装 husky 和 lint-staged，然后向项目的 package.json 中添加一个配置，该配置将在预提交挂钩中自动格式化支持的文件（注意这里 npm 版本至少需要 v7.x）。该配置默认支持的文件为 `*.{js,css,md}`，我们可以根据需要修改，例如：

```json:no-line-numbers
"lint-staged": {
  "*.{json,js,ts,tsx,css,html,md}": "prettier --write"
}
```