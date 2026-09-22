---
title: Postman 请求配置：接口地址与 Headers
date: 2026-08-24 21:00:00
permalink: 2026/08/24/8月24日笔记/
description: 记录 Base URL、完整接口地址与请求头的区别，梳理 Postman 请求配置。
study_order: 2
tags:
  - Postman
  - HTTP
categories:
  - Web 与接口
---


openrouter.ai   API接口网站

Base URL ：不带最后的接口路径（自动补全）Postman不支持

完整 Endpoint ：完整全路径，包含接口后缀  Postman只支持这种

## 【1】Postman Headers（请求头）是什么？

当 Authorization 选择Bearer Token，Postman 会自动在 Headers 增加一行：

Key   Authorization 	Value   Bearer sk‑xxxxxxxx

当 Body 选raw‑JSON，Postman 自动添加：

Key   Content‑Type	  Value   application/json

不需要手动写 headers，会自动生成



进入到数据库：

```bash
sudo mysql -u root
```

