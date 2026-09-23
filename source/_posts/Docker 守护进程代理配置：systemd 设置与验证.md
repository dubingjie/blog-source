---
title: Docker 守护进程代理配置：systemd 设置与验证
date: 2026-09-23 20:00:00
permalink: 2026/09/23/Docker 配置代理方法/
description: 记录通过 systemd 为 Docker 守护进程配置 HTTP、HTTPS 代理和 NO_PROXY 的步骤，包括重启、验证、修改与取消代理。
categories:
  - 数据库与容器
tags:
  - Docker
  - 代理
  - systemd
study_order: 3
---

# Docker 配置代理方法

##    【1】适用场景

当 Docker 守护进程需要访问国外网络时（如 docker login、docker push 到 Docker Hub），而宿主机有可用代理，需要给 Docker 服务单独配置代理（Docker 不读 shell 的http_proxy 环境变量，必须单独配）。

查看本机代理地址

   ```bash
   env | grep -i proxy
   ```

从输出中找到代理地址（一般是 http://某IP:某端口）。

## 【2】配置步骤

#### 1、创建配置文件

   ```bash
   mkdir -p /etc/systemd/system/docker.service.d
   nano /etc/systemd/system/docker.service.d/proxy.conf
   ```

写入以下内容（把 <你的代理IP> 和 <端口> 换成实际值）：

   ```ini
   [Service]
   Environment="HTTP_PROXY=http://<你的代理IP>:<端口>"
   Environment="HTTPS_PROXY=http://<你的代理IP>:<端口>"
   Environment="NO_PROXY=localhost,127.0.0.1,192.168.0.0/16,172.16.0.0/12"
   ```

NO_PROXY 的含义：这些地址不走代理。其中 192.168.x.x 和 172.16~31.x.x 覆盖内网和 Docker 容器网段，容器间通信必须直连，不能省略。

### 2、重载并重启 Docker

   ```bash
   systemctl daemon-reload
   systemctl restart docker
   ```

注意：重启 Docker 会停止所有运行中的容器，重启后需要重新启动业务容器：

```bash
cd <项目目录> && docker compose up -d
```



### 3、验证

   ```bash
   systemctl show docker --property=Environment
   ```

输出中包含刚才配置的代理地址即生效。

之后测试：

   ```bash
   docker login -u <用户名>     # 能返回 Login Succeeded 即网络已通
   ```

修改代理地址

   ```bash
   nano /etc/systemd/system/docker.service.d/proxy.conf   # 改地址
   systemctl daemon-reload && systemctl restart docker    # 重启生效
   ```

取消代理

   ```bash
   rm /etc/systemd/system/docker.service.d/proxy.conf
   systemctl daemon-reload && systemctl restart docker
   ```

### 4、补充说明

   • 镜像加速器（/etc/docker/daemon.json 里的 registry-mirrors）只加速 pull（下载），对 login/push 无效；代理两者都管。
   • 推荐组合：pull 走国内镜像加速器（快），login/push 走代理（唯一能连上 Docker Hub 的方式）。
   • 如果 build 过程中 pip/npm 下载国外包超时，同样是因为构建容器直连国外失败，解法是把包管理源换成国内镜像（PyPI 用清华源、npm 用淘宝源），不一定要配代理。