# 压缩日志联动验证（未发布）

2026-11-12，本地源码验证，GOWORK=off，调用方显式使用开发 replace。

- timer、log：完整测试和基准通过；并发时间轮、压缩块、字典、损坏/截断恢复、并发追加和跨分割跟随通过竞态验证。
- discover、service、starter、gateway 及直接日志调用方：完整测试和基准通过；Service/Gateway 使用 GODEBUG=http2xconnect=1 覆盖 H2 WebSocket。
- CLI 实测：logv -tail 2、gateway log -cat、压缩 stdin 加 -dict 均恢复同一批记录。
- 10,000 条样本无丢失：原文 3,698,890 字节；连续 gzip 127,008；独立 gzip 块 147,006；本方案数据 135,748 + 字典 4,859 = 140,607。字典收益依负载而变，不承诺高于连续 gzip。
- GitHub 代码仓库远端及索引已发布 tag 均核验；未创建新 tag 或推送。发布前需移除开发 replace、发布依赖并重新验证。

可选外部集成测试按各模块原有环境要求跳过；本地测试通过不等于全部外部服务场景已执行。
