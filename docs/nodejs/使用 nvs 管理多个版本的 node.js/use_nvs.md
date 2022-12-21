# 使用 nvs 管理多个版本的 node.js

## 安装

### Windows

从 [GitHub 上的 NVS 发布页面](https://github.com/jasongin/nvs/releases) 下载 Windows 安装程序（MSI）包。安装完成后，在 CLI 中输入 `nvs --version`，输出对应的版本号就说明安装成功。我这里使用的 CLI 是 Git Bash，安装成功之后需要执行一下 `nvs install`，该命令会在 ~/.bashrc 文件中设置 nvs 的环境变量。

另外，你还可以使用 [chocolate](https://chocolatey.org/) 来安装它：`choco install nvs`，在 Windows 11 中也可以使用 [winget](https://apps.microsoft.com/store/detail/app-installer/9NBLGGH4NNS1?hl=en-us&gl=US) 来安装它：`winget install jasongin.nvs`。

## 使用

### 基本用法

#### 列出可下载的 node 版本

```bash:no-line-numbers
nvs lsr
```

#### 下载一个 node 版本

```bash:no-line-numbers
nvs add <version>
```

#### 删除一个 node 版本

```bash:no-line-numbers
nvs rm <version>
```

#### 列出本地的 node 版本

```bash:no-line-numbers
nvs ls
```

#### 将一个版本链接为默认（全局）版本

```bash:no-line-numbers
nvs link <version>
```

该命令设置完后需要重启当前的 CLI 后才生效。

#### 删除默认版本的链接

```bash:no-line-numbers
nvs unlink
```

#### 在当前 shell 中使用某个 node 版本

```bash:no-line-numbers
nvs use <version>
```

#### 基于 cwd 自动切换

```bash:no-line-numbers
nvs auto [on/off]
```

运行 `nvs auto on` 后，进入包含 .node-version 或者 .nvmrc 文件的目录时，nvs 会自动切换到文件中指定的 node 版本，如果指定的版本不存在，则会下载安装。手动运行 `nvs auto on` 只在当前 shell 中生效，建议将其将添加到 ~/.bashrc 中。

### 更多

更多命令，请参考 [GitHub 上的文档](https://github.com/jasongin/nvs#command-reference)。
