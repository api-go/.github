# 实时压缩日志正式发布验证 — 2026-11-12

所有下列 tag 已推送并以 git ls-remote 核验到对应提交。调用方移除开发 replace，在 GOWORK=off 下使用正式依赖运行完整 go test -v ./... 与 go test -bench=. -benchtime=100ms ./...；Service/Gateway 设置 GODEBUG=http2xconnect=1。

| 公共模块 | 正式版本 |
| --- | --- |
| timer | v1.5.2 |
| log | v1.5.19 |
| http | v1.5.18 |
| redis | v1.5.24 |
| js | v1.5.19 |
| mail | v1.5.10 |
| starter | v1.5.16 |
| task | v1.5.17 |
| db | v1.5.26 |
| api | v1.5.23 |
| discover | v1.5.23 |
| service | v1.5.54 |
| gateway | v1.5.28 |

Timer/Log 并发与归档测试、关键代理竞态在开发验证阶段通过；覆盖字典配对/损坏、截断恢复、并发追加、日期分割跟随及完整 TraceID。发布验证再次执行正式依赖下的完整测试和基准；可选外部环境测试按原规则跳过，不代表已执行全部外部集成。

独立消费程序仅依赖正式 Service v1.5.54、无 replace，照 README 使用 log.SetDefaultConfig + service.Start；构建后 server log -tail 1 -json 正确读取当天压缩文件并保留 TraceID，不启动业务监听。

10,000 条样本无丢失：原文 3,698,890 字节；连续 gzip 127,008；独立 gzip 块 147,006；本方案数据 135,748 + 字典 4,859 = 140,607。字典压缩收益依负载而变，不承诺优于连续 gzip；块结构支持跳过旧块 tail 和追加恢复。

源码、版本索引、正式依赖与远端 tag 一并对齐；历史验证证据中的旧域名不作为现行模块路径。
