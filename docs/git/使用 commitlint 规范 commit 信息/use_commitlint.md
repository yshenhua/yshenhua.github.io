# 使用 commitlint 规范 commit 信息

## 安装 commitlint

安装 commitlint 和 commitlint config-conventional，然后 package.json 中配置 commitlint 以使用它。

<CodeGroup>
  <CodeGroupItem title="npm">

```bash:no-line-numbers
npm install @commitlint/{cli,config-conventional} --save-dev
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add @commitlint/{cli,config-conventional} --dev
```  

  </CodeGroupItem>
</CodeGroup>

```json:no-line-numbers
"commitlint": {
  "extends": ["@commitlint/config-conventional"]
}
```

commitlint 使用 [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) 来支持配置文件，这意味着您还可以通过 .commitlintrc、commitlint.config.js 等文件配置 commitlint。

## 安装 husky

<CodeGroup>
  <CodeGroupItem title="npm">

```bash:no-line-numbers
# Install Husky v6
npm install husky --save-dev
# Active hooks
npx husky install
# Add hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
# Install Husky v6
yarn add husky --dev
# Active hooks
yarn husky install
# Add hook
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

  </CodeGroupItem>
</CodeGroup>

现在不按照 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) 规范提交的 commit 会被阻止并给出错误提示：

```bash:no-line-numbers
$ git commit -m 'project init'
⧗   input: project init
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```