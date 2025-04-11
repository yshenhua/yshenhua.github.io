# Git 常用命令

## git-config

### git config [\<file-option\>] -l

列出配置文件中的所有配置项以及它们的值。

- \<file-option\>  
  读取配置时，默认从系统、全局和资源库的本地配置文件中读取数值，选项 `--system`、`--global`、`--local`、`--worktree` 和 `--file <filename>` 可以用来告诉命令只从选定的位置读取。

### git config [\<file-option\>] \<name\>

读取某个配置项的值。

- \<file-option\>  
  默认读取当前位置的配置文件，不存在时读取上一级别的配置文件。

- \<name\>  
  要读取的配置项。

### git config [\<file-option\>] (\<name\> \<value\> | --unset \<name\>)

设置或删除某个配置项的值。

- \<file-option\>  
  默认为当前仓库的配置文件。

- \<name\> \<value\>  
  设置某个配置项的值。

- --unset \<name\>  
  删除某个配置项的值。

## git-clone

### git clone [-o \<name\>] [-b \<name\>] \<repository\> [\<directory\>]

克隆现有的仓库。

- -o \<name\> | --origin \<name\>  
  为来源仓库命名，默认为 origin。后续也可以通过 `git remote rename <old> <new>` 命令修改。

- -b \<name\> | --branch \<name\>  
  指定分支或者标签，不指定时默认为主分支。

- \<directory\>  
  把仓库克隆到指定的目录下，不指定目录时默认在当前位置创建一个和仓库名一样的目录。

## git-add

### git add ([\<pathspec\>…​] | [-u] | [-A])

将文件添加到暂存区。

- \<pathspec\>…​  
  将一个或多个文件添加到暂存区，支持文件通配符。

- -u | --update  
  忽略新增文件，将修改和删除文件更新到暂存区。

- -A | --all | --no-ignore-removal  
  将所有文件添加到暂存区，等同于 `git add .`。

## git-commit

### git commit [-m \<msg\>] [--amend]

将暂存区内容添加到本地仓库中。不使用其他参数时会打开默认的文本编辑器让你输入提交信息。

- -m \<msg\> | --message=\<msg\>  
  使用给定的 \<msg\> 作为提交消息。如果使用多个 -m 选项，它们的值将作为一个个段落连接起来。

- --amend  
  通过该提交替换掉旧的提交，即修改提交。

## git-log

### git log [\<revision-range\>] [--oneline] [-\<number\>] [-p] [\<path\>…​]

显示提交信息。

- \<revision-range\>  
  指定修订范围，显示导致当前提交的整个历史记录，默认为 HEAD。

- --oneline  
  单行形式，只显示较短的提交 ID 和一行提交信息。

- -\<number\> | -n \<number\> | --max-count=\<number\>  
  限制提交的输出数量。

- -p | --patch  
  显示每个提交的详细差异。

- \<path\>…  
  只显示与指定路径匹配的文件的提交信息。

## git-reset

### git reset [--soft | --mixed | --hard] [\<commit\>]

重置当前 HEAD 到指定的状态。未指定模式时，默认为 `--mixed`。

- --soft  
  只重置 HEAD，自 \<commit\> 以来的更改会退至暂存区。

- --mixed  
  重置 HEAD 和暂存区，自 \<commit\> 以来的更改会退至工作区。

- --hard  
  重置 HEAD、暂存区和工作区，即丢弃所有更改。

- \<commit\>  
  指定提交，默认为 HEAD。

## git-branch

### git branch [-r | -a] [-v]

列出分支，没有参数时，默认列出本地分支。

- -r | --remotes  
  列出远程跟踪分支。

- -a | --all  
  列出远程跟踪分支和本地分支。

- -v | -vv | --verbose  
  显示每个分支当前指向的提交记录，使用 `-vv` 还会显示对应的上游分支。

### git branch \<branchname\> [\<start-point\>]

创建分支。

- \<start-point\>  
  新分支的起点，可以是分支、提交或者标签，默认为 HEAD。

### git branch (-d | -D) [-r] \<branchname\>…​

删除一个或多个分支。

- -d | --delete  
  要删除的分支必须完全合并到其上游分支中。

- -D  
  相当于 `--delete --force`，即没有完全合并到其上游分支也能删除。

- -r | --remotes  
  删除远程跟踪分支。

## git-checkout

### git checkout [-f] [-m] [\<branch\>]

切换分支。

- -f | --force  
  丢弃本地更改，强制切换分支。可以使用 `git checkout -f` 放弃当前分支的本地更改。

- -m | --merge  
  切换分支同时将本地更改合并过去。如果合并冲突，切换会中止。

### git checkout [[-b | -B | --orphan] \<new_branch\> | --detach] [\<start-point\>]

切换到新建的分支，或者分离 HEAD 并切换到特定的提交。

- -b \<new_branch\>  
  创建新分支并切换到该分支。

- -B \<new_branch\>  
  强制创建新分支并切换到该分支（遇到同名分支会将其覆盖）。

- --orphan \<new_branch\>  
  创建一个没有任何提交历史的新分支并切换到该分支。

- --detach  
  分离 HEAD 并切换到特定的提交。

- \<start-point\>  
  新分支或者分离状态的起点，可以是分支、提交或者标签，默认为 HEAD。

## git-merge

### git merge [\<commit\>…​]

合并，将当前分支的提交和其他提交按时间顺序整合到一起。

- \<commit\>…  
  指定一个或多个要合并到当前分支的其他提交。当参数为分支或者标签，Git 会将其解析为具体的提交对象，然后将该提交的更改合并到当前分支。不指定时默认合并当前分支的上游分支，当前分支未设置上游分支则报错。

### git merge (--continue | --abort)

合并冲突时，解决冲突继续合并或者中止合并。

- --continue  
  继续合并操作（解决冲突并将文件 `git add` 至暂存区后），会生成一个合并提交。

- --abort  
  中止合并过程，并尝试恢复到合并前的状态。

## git-rebase

### git rebase [\<upstream\> [\<branch\>]]

变基，将一个分支的提交整合到另一个提交后。

- \<upstream\>  
  指定要基于的上游分支，可以是任何有效的提交（与 `git merge` 中的 `<commit>` 类似），默认为当前分支的上游分支。

- \<branch\>  
  指定要变基的分支，默认为当前分支。

### git rebase (--continue | --abort | --skip)

发生冲突时，解决冲突继续变基或者中止变基。`--continue` 和 `--abort` 与 `git merge` 中的对应参数的效果类似。

- -skip  
  跳过当前提交，继续变基操作。

## git-cherry-pick

### git cherry-pick \<commit\>…​

将指定提交的改动复制到当前分支，按指定顺序生成对应的新提交。

- \<commit\>…​  
  指定一个或多个要应用到当前分支的其他提交。`..<branch>` 可以指定所有属于 \<branch\> 但不属于 HEAD 的祖先的提交。

### git cherry-pick (--continue | --abort | --quit)

发生冲突时，解决冲突继续 cherry-pick 或者中止 cherry-pick。`--continue` 和 `--abort` 与 `git merge` 中的对应参数的效果类似。

- --quit  
  中止 cherry-pick 过程，保留已经生成的提交。

## git-stash

### git stash [push [-m \<message\>]] [-u]

将更改保存到一个栈结构的贮藏区。

- -m | --message \<message\>  
  自定义备注信息，默认会根据提交信息自动生成备注。

- -u | --include-untracked  
  包括未跟踪的文件。

### git stash list

显示所有贮藏记录。

### git stash (apply | drop | pop) [stash@{n}]

恢复或移除贮藏内容。

- apply  
  恢复贮藏内容至工作区。

- drop  
  删除一条贮藏记录。

- pop  
  恢复贮藏内容至工作区并删除该贮藏记录。

- stash@{n}  
  指定贮藏记录，默认为 stash@{0}，即最新的记录。

## git-remote

### git remote [[add | set-url] \<name\> \<url\> | remove \<name\>]

设置远程仓库。

- add \<name\> \<url\>  
  添加远程仓库。

- set-url \<name\> \<url\>  
  修改远程仓库地址。

- remove \<name\>  
  删除远程仓库。

### git remote -v

查看已配置的远程仓库。

## git-fetch

### git fetch [\<repository\> [\<refspec\>…​]]

从远程仓库获取最新数据。

- \<repository\>  
  来源仓库，可以是 URL 或者名称。不指定时，如果当前分支未设置上游分支则默认为 origin，否则默认为该上游分支的仓库。

- \<refspec\>…  
  指定要获取的引用以及要更新的本地引用。`<refspec>` 的格式是 `[+]<src>[:<dst>]`，其中 `<src>` 是要获取的引用，可以是分支、提交或者标签；`<dst>` 是要更新的本地引用（当前分支之外的本地分支），如果本地分支不存会自动创建，不指定时只更新远程跟踪引用；更新本地分支时如果无法快进合并（Fast-Forward），更新会中止，`+` 可以让其强制更新。

## git-pull

### git pull [--dry-run] [\<repository\> [\<refspec\>…​]]

从远程仓库获取最新数据合并到本地分支。

- --dry-run  
  模拟拉取。

- \<repository\> [\<refspec\>…​]  
  指定来源仓库、要获取的引用以及要更新的本地分支，与 `git fetch` 中的 `<repository> [<refspec>…​]` 用法类似，不过 `git merge` 会将获取到的更新合并到 `<dst>`，且 `<dst>` 默认为当前分支。

## git-push

### git push [-n] [-u] [\<repository\> [\<refspec\>…​]]

将本地仓库更新推送到远程仓库。

- -n | --dry-run  
  模拟推送。

- -u | --set-upstream  
  设置上游分支。

- \<repository\>  
  目标仓库，可以是 URL 或者名称。默认为上游分支。

- \<refspec\>…  
  指定要推送的本地引用以及要更新的目标引用，与 `git fetch` 中的 `<refspec>…` 用法类似，不过 `<src>` 是本地引用，默认为当前分支；`<dst>` 是要更新的目标引用，默认和 `<src>` 相同。
