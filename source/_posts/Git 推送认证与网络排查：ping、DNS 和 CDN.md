---
title: Git 推送认证与网络排查：ping、DNS 和 CDN
date: 2026-09-18
permalink: 2026/09/18/git-auth-network-diagnostics/
description: 记录开启双重认证后的 Git 推送问题，区分 ping 与 nslookup 的用途，并梳理 DNS 解析和 CDN 的关系。
categories:
  - Linux 与网络
tags:
  - Git
  - Gitee
  - ping
  - DNS
  - CDN
study_order: 4
---
# 9月18日 笔记

（嗯，额，呃）

## 【1】git 推送

第一次把项目推送到远程仓库，需要先执行：

```bash
git push -u origin main
```



gitee 账号开启了 2FA 认证，所以推送代码会被拒绝，需要用私人令牌来验证身份。



直接把令牌写进远程地址：

```bash
git remote set-url origin https://dubingjie88:你的令牌@gitee.com/dubingjie88/java-web-test.git
```



如果还是推送不成功，可能是因为代理干扰。

查看是否配置了代理：

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```





## 【2】网络诊断工具

### 1、ping

```powershell
ping qq.com
```

**作用：**

测试本机到目标主机的网络是否连通，以及延迟和丢包情况。

**执行过程：**

1. 你的电脑先通过系统配置的 DNS 服务器，把 `qq.com` 解析成 IP 地址（比如 `123.151.137.18`）。
2. 然后向这个 IP 发送 **ICMP Echo Request**（回显请求）数据包。
3. 对方如果允许 ICMP，就回一个 **ICMP Echo Reply**（回显应答）。
4. 你看到的是往返时间（RTT，如 `time=25ms`）和丢包率。

它测的是：**网络层（IP/ICMP）的连通性和质量**。

注意：很多服务器/防火墙会禁用 ICMP，所以 `ping` 不通不代表网站打不开。



### 2、nslookup.exe

```powershell
nslookup qq.com 1.1.1.1
```

**作用：**

指定用 `1.1.1.1` 这台 DNS 服务器来解析 `qq.com`，看它返回什么 IP。



**拆解：**

- `nslookup`：查询 DNS 记录的工具。
- `qq.com`：要查询的域名。
- `1.1.1.1`：指定使用的 DNS 服务器（Cloudflare 的公共 DNS）。

它测的是：**DNS 解析层面**——这个特定的 DNS 服务器能不能解析、解析成什么 IP、响应快不快。

`1.1.1.1` 是 Cloudflare 的公共 DNS，特点是全球任播、速度快、隐私政策好，在国外/国际线路场景常用。



补充：`119.29.29.29` 是 **腾讯 DNSPod 的公共 DNS**（也叫 DNSPod Public DNS+）



**对比：**

| 维度               | `ping qq.com`         | `nslookup qq.com 1.1.1.1` |
| :----------------- | :-------------------- | :------------------------ |
| 工作层次           | 网络层（ICMP）        | 应用层（DNS 查询）        |
| 是否解析域名       | 会，用系统默认 DNS    | 会，用指定的 1.1.1.1      |
| 测什么             | 连通性、延迟、丢包    | DNS 解析结果和速度        |
| 输出内容           | IP + 往返时间 + 丢包  | 域名对应的 IP 列表        |
| 能否判断网站可访问 | 不能（ICMP 可能被封） | 不能（只查 DNS）          |



- `ping` 关心的是"能不能通、快不快"。
- `nslookup` 关心的是"域名被解析成哪个 IP"。



### 3、什么场景下用？

**用 `ping`：**

- 网站打不开，想先看网络通不通。
- 测延迟、丢包，判断线路质量。
- 确认某台服务器是否在线。

**用 `nslookup ... 1.1.1.1`：**

- 怀疑本地 DNS 被污染或解析错误，用国外公共 DNS 对比。
- 排查 DNS 污染、CDN 调度问题。
- 想验证某个域名在 Cloudflare DNS 下解析成什么。



### 4、网络排查思路

网站打不开时，可以这样串起来用：

1. `nslookup qq.com 1.1.1.1` → 看解析出的 IP 是否正常。
2. `nslookup qq.com 119.29.29.29` → 对比另一个 DNS 的结果，判断是否被污染或调度异常。
3. `ping <解析出的IP>` → 看这个 IP 通不通、延迟多少。
4. 如果 `ping` 不通但网页能开，说明只是 ICMP 被封，不代表故障。



### 5、阿里的 DNS

首选 `223.5.5.5`，备用 `223.6.6.6`



### 4、CDN 是什么？

**CDN = Content Delivery Network，内容分发网络。**

把内容提前复制到离用户近的多个节点上，让用户就近获取，从而加速访问。



### 5.CDN 和 DNS 的关系

- `nslookup qq.com 1.1.1.1` 返回 3 个 IP。
- 这 3 个 IP 很可能就是**不同地区的 CDN 节点**，或同一调度体系下的多个入口。
- **DNS 负责"指路"**：根据你的位置，把你导向最近的 CDN 节点。
- **CDN 负责"供货"**：节点上缓存着内容，直接发给你。