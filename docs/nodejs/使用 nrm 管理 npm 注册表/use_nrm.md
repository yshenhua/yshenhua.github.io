# 使用 nrm 管理 npm 注册表

我们可以通过 `npm set registry <url>` 设置 npm 注册表地址，通过 `npm get registry` 查看当前的注册表地址。但是 url 不好记忆，如果需要频繁切换 npm 注册表可以使用 nrm 来管理它们。

## 安装

```bash:no-line-numbers
npm install -g nrm
```

## 使用

### 基本用法

#### 查看可选注册表

```bash:no-line-numbers
nrm ls
```

其中 \* 代表当前使用的注册表。

#### 添加自定义注册表

```bash:no-line-numbers
nrm add <registry> <url>
```

#### 删除自定义注册表

```bash:no-line-numbers
nrm del <registry>
```

#### 切换注册表

```bash:no-line-numbers
nrm use <registry>
```

当前版本 1.2.5 切换注册表时存在 BUG，会导致 `nrm current` 无法输出，`nrm ls` 时也无法显示 \* 标记当前使用的注册表。解决方法：在 nrm 目录下找到 cli.js，该文件的 211 行判断有误，修改为 `name in registries || (hasOwnProperty(customRegistries, name) && customRegistries[name].registry === registry.registry)` 即可。

#### 查看当前注册表

```bash:no-line-numbers
nrm current
```

#### 测试全部或者某个注册表的响应时间

```bash:no-line-numbers
nrm test [registry]
```

### 更多

更多命令，请参考 [GitHub 上的文档](https://github.com/Pana/nrm#usage)。
