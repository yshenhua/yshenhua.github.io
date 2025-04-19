# Git 身份验证

## HTTPS

通过 HTTP 协议连接远程仓库时需要使用对应的凭据进行身份验证。Git 默认不存储凭据，每次连接都会提示你输入用户名和密码。为了避免重复输入提高操作效率，我们可以通过一些配置实现自动登录。

最简单粗暴的方式是将凭据加到 URL 上，具体做法是将 `<your_credential>@` 插入到 `http[s]://` 和 `<host>` 之间。例如：

```bash
# 克隆仓库时使用用户名密码会默认远程仓库 origin 为这个带凭据的地址
git clone https://yshenhua:123456@gitee.com/yshenhua/note-assistant.git
```

或者：

```bash
# 手动将仓库 origin 的地址更改为带个人访问令牌的地址
git remote set-url origin https://github_pat_123456@github.com/yshenhua/yshenhua.github.io.git
```

因为基于仓库地址，这种方式只能作用于当前项目。要实现用户级别或者系统级别的凭据存储，可以使用 Git 的凭据系统。例如：

```bash
# 列出所有 credential.helper 配置（生效策略为就近原则，即生效优先级是项目级 > 用户级 > 系统级）
git config -l|grep credential.helper
# 将用户级的 credential.helper 设置为 store 模式，登录成功后 Git 会将你的凭据保存在 ~/.git-credentials 文件中
git config --global credential.helper store
```

如果不想凭据以明文的形式存储，可以选择 osxkeychain 或者 manager 模式。前者用于 macOS 系统，后者用于 Windows 系统。处于这种模式时，Git 会将凭据保存到操作系统的凭据管理器上，以 Windows 系统为例：登录成功后，到“控制面板\用户帐户\凭据管理器”，在“Windows 凭据”中可以找到对应的凭据。

![Windows 凭据](./git_authentication_1.png)

当然，credential.helper 还有一些其他模式，详见[官方文档](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)。

凭据是通过 URL 关联的。如果同一代码托管平台上的不同仓库使用不同账号，可以把 credential.useHttpPath 设置为 true，这样关联凭据的 URL 会使用 HTTP 路径格式的。比如默认的 URL 为 `git:https://github.com`，而此时的 URL 为 `git:https://github.com/yshenhua/yshenhua.github.io.git`，防止了默认 URL 的凭据被另一个账号覆盖掉。

## SSH

如果通过 SSH 协议连接远程仓库，则需使用 SSH 秘钥进行身份验证。SSH 秘钥通过 `ssh-keygen` 命令生成，默认为 ED25519 格式，保存在用户主目录下的 `.ssh` 文件夹中，`~/.ssh/id_ed25519` 为私钥，`~/.ssh/id_ed25519.pub` 为公钥。我们只需将公钥添加到远程仓库就可以进行访问了，以 GitHub 为例：

登录 GitHub 后，点击头像，在弹出菜单中点击 Settings 进入设置页面，然后选择 SSH and GPG keys 选项，点击 New SSH keys 打开 SSH 密钥添加界面。Key type 保持默认的 Authentication Key，填写标题和公钥，点击 Add SSH key，通过 GitHub 验证就添加完成了。

![GitHub New SSH keys](./git_authentication_2.png)

为了增强安全性，推荐在生成密钥对时设置密码。但是这样每次连接都会提示你输入私钥密码，通过 `ssh-agent` 管理私钥只需在添加时输入一次密码：

```bash
# 启动 ssh-agent
eval `ssh-agent`
# 添加指定密钥
ssh-add ~/.ssh/id_ed25519
```

如果有多个账号要使用 SSH 协议，可以在 `~/.ssh/config` 中添加代理配置，比如：

```
Host host1
HostName github.com
IdentityFile ~/.ssh/id_ed25519_1

Host host2
HostName github.com
IdentityFile ~/.ssh/id_ed25519_2
```

这样通过某个代理去连接远程仓库就会用到对应的密钥了，把 SSH 地址中 Host 部分改成对应的代理名称就可以了，比如：

```bash
# 将仓库 origin 的地址更改为代理地址，
# 连接远程仓库时 host2 会被替换为 github.com，使用密钥 ~/.ssh/id_ed25519_2 鉴权
git remote set-url origin git@host2:yshenhua/yshenhua.github.io.git
```
