# Git 指令

## 1. 常用指令

* `git clone 项目地址`：克隆远程仓库的代码到本地
* `git add 文件名`：添加文件到本地缓存(*表示所有)
* `git commit -m "描述信息"`：将缓存区文件添加到本地版本库
* `git rm 文件名`：移除文件从本地版本库
* `git rm 文件名 --cach`：移除文件从本地缓存区
* `git status`：查看状态
* `git diff 文件名`：查看被修改的内容

* `git log`：查看版本
* `git reset --hard HEAD^`：返回上一个状态(几个^表示上几个状态，也可以使用~100)
* `git reset --hard HEAD commit id`：回到未来

## 2. 初始化命令

* `git config --global user.name`：全局配置
* `git config --global user.email`：全局配置
* `git ssh-keygen -t rsa -C 邮箱`：SSH加密文件，用来建立信任关系(C:\User\用户名\\.shh\\id_rsa.pub)，粘贴到云端服务器SSH中

## 3. 多人开发指令

* `git fetch orgin master`：从master主分支拉取当前最新内容
* `git merge FETCH_HEAD`：将拉取下来的内容与当前版本合并
* `git pull orgin master`：同时拉取和合并

## 4. 多分支开发

> 多人开发太麻烦了，每次提交都要拉取合并提交，有了分支后各分支各不相干，由主干master合并

* `git branch`：查看分支
* `git branch <name>`：创建分支
* `git chekout <name>`：切换分支
* `git checkout -b <name>`：创建并切换到创建的分支
* `git merge <name>`：合并某分支到当前分支
* `git branch -d <name>`：删除分支
* `git merge branch --name(master) `：在主干上合并分支
* `git merge master --name(branch)`：在分支上合并主干
* `git checkout -b feature(master)`：创建功能分支