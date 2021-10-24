# Git 常用命令

## git-clone

#### git clone [-o \<name\>] [-b \<name\>] \<repository\> [\<directory\>]

克隆现有的仓库。

- -o \<name\> | --origin \<name\>  
  为来源仓库命名，默认为 origin。后续也可以通过 `git remote rename <old> <new>` 命令修改。

- -b \<name\> | --branch \<name\>  
  指定分支或者标签，不指定时默认为主分支。

- \<directory\>  
  把仓库克隆到指定的目录下，不指定目录时默认在当前位置创建一个和仓库名一样的目录。

## git-add

#### git add ([\<pathspec\>…​] | [-u] | [-A])

将文件添加到暂存区。

- \<pathspec\>…​

将一个或多个文件添加到暂存区，支持文件通配符。

- -u | --update

忽略新增文件，将修改和删除文件更新到暂存区。

- -A | --all | --no-ignore-removal

将所有文件添加到暂存区，等同于 `git add .`。

## git-commit

#### git commit [-m \<msg\>] [--amend]

将暂存区内容添加到本地仓库中。不使用其他参数时会打开默认的文本编辑器让你输入提交信息。

- -m \<msg\> | --message=\<msg\>

使用给定的 \<msg\> 作为提交消息。如果使用多个 -m 选项，它们的值将作为一个个段落连接起来。

- --amend

通过该提交替换掉旧的提交，即修改提交。

## git-branch

#### git branch [-r | -a] [-v]

列出分支，没有参数时，默认列出本地分支。

- -r | --remotes

列出远程跟踪分支。

- -a | --all

列出远程跟踪分支和本地分支。

- -v | -vv | --verbose

显示每个分支当前指向的提交记录。

#### git branch \<branchname\> [\<start-point\>]

创建分支。

- \<start-point\>

新分支当前指向，可以是分支名，commit-id 或者标签。不指定该参数时默认为当前分支名。

#### git branch (-d | -D) [-r] \<branchname\>…​

删除一个或多个分支。

- -d | --delete

要删除的分支必须完全合并到其上游分支中。

- -D

相当于 `--delete --force`，即没有完全合并到其上游分支也能删除。

- -r | --remotes

删除远程跟踪分支。

## git-checkout

#### git checkout [-f] [-m] [\<branch>]

切换分支。

- -f | --force

丢弃本地更改，强制切换分支。可以使用 `git checkout -f` 放弃当前分支的本地更改。

- -m | --merge

切换分支同时将本地更改合并过去。

#### git checkout [[-b | -B | --orphan] \<new_branch\>] [\<start-point\>]

切换到新建的分支。

- -b <new_branch>

创建新分支并切换到该分支。

- -B <new_branch>

强制创建新分支并切换到该分支（遇到同名分支会将其覆盖）。

- --orphan <new_branch>

创建一个没有任何提交历史的新分支并切换到该分支。

- \<start-point\>

同 [`git branch <branchname> [<start-point>]`](#git-branch-branchname-start-point) 中的 \<start-point\> 一样。

## git-fetch

#### git fetch [\<repository\> [\<refspec\>…​]]

- \<repository\>

来源仓库，可以是 URL 或者名称。

## git-pull

#### git pull [-f] [\<repository\> [\<refspec\>…​]]

- -f | --force

- \<repository\>

来源仓库，可以是 URL 或者名称。

- \<refspec\>…

指定要拉取的分支已经要更新的本地分支

## git-stash

## git-cherry-pick

## git-remote

## git-push
