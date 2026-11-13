[English](README.md) | [简体中文](README.zh-CN.md)

# @go 开发指引 (INDEX)

## 设计哲学与原则

本项目致力于构建一套**极致精简、消除摩擦、安全可靠、高性能**的 Go 开发基础设施。我们的核心设计理念包括：

*   **统一性**: 提供一套标准化的工具集，减少跨库切换的认知负担。
*   **易用性**: 极简 API 设计，降低门槛，加速开发。
*   **可靠与安全**: 预置安全最佳实践（如加密、内存擦除），确保代码稳健。
*   **高性能**: 深度利用 Go 特性，追求卓越的运行效率。
*   **解决痛点**: 专注于消除类型转换、错误处理、服务发现等过程中的摩擦。

---

## 模块清单与 API 参考

详细文档: https://github.com/api-go/


以下版本和 API 以已发布 tag 为准，不包含本地未发布改动。

### go/jsmod v1.5.6
带不安全方法追踪的 JS 模块注册表。
- **API**: `Register`, `GetModules`, `NewContext`, `Get`, `IsSafeMode`, `MakeError`

### go/timer v1.5.2
高性能时间流管控与退避重试。
- **API**: `Retry`, `Start`, `WithBackoff`, `WithMaxRetries`, `NewDebouncer`, `NewThrottler`, `NewTimeWheel`, `RunTimeout`, `Tracker`

### go/cast v1.5.9
语义化类型强转与泛型工具。
- **API**: `To`, `Convert`, `As`, `ToMap`, `ToSlice`, `FillMap`, `FillSlice`, `ToJSON`, `ToJSONBytes`, `PrettyToJSON`, `FromJSON`, `UnmarshalJSON`, `ToYAML`, `FromYAML`, `UnmarshalYAML`, `ParseTime`, `FormatTime`, `Int`, `String`, `Bool`, `Duration`, `RealValue`, `GetLowerName`, `GetUpperName`, `FixUpperCase`

### go/rand v1.5.5
高并发场景下的随机数与字节生成。
- **API**: `Int`, `FastInt`, `Float`, `FastFloat`, `Byte`, `Bytes`, `Perm`, `Shuffle`

### go/encoding v1.5.9
标准及整数填充编解码。
- **API**: `Hex`, `UnHex`, `Base64`, `UnBase64`, `Base64Raw`, `URLBase64`, `UnURLBase64`, `URLBase64Raw`, `URLEncode`, `UnURLEncode`, `HTMLEscape`, `HTMLUnescape`, `UTF8Valid`, `NewIntEncoder`, `EncodeInt`, `AppendInt`, `DecodeInt`, `ExchangeInt`, `FillInt`, `HashInt`, `FoldInt`, `SortJoin`

### go/js v1.5.19
按解析后的语法检查命名函数，不再误拒绝字符串、注释、模板和正则中的相同文本。
基于 goja 的轻量级低代码引擎，支持自动桥接与安全模式。
- **API**: `Define`, `Call`, `CallContext`, `Doc`, `CheckVersion`, `FuncList`, `NewPool`, `Start`, `Stop`, `Status`

### go/shell v1.5.9
终端样式美化与命令链管道执行。
- **API**: `Run`, `RunCommand`, `Start`, `InteractiveRun`, `Pipeline`, `PipelineCommands`, `Style`, `StripANSI`, `Red`, `Green`, `Blue`, `Yellow`

### go/safe v1.5.5
内存保护、安全擦除与防核心转储。
- **API**: `NewSafeBuf`, `NewSafeString`, `LockMemory`, `UnlockMemory`, `DisableCoreDump`, `ZeroMemory`, `EncryptChaCha20`, `DecryptChaCha20`, `MakeSafeToken`, `Concat`, `Base64`, `Hex`, `UrlEncode`

### go/id v1.5.10
分布式与数据库性能优化的 ID 生成。
- **API**: `NewIDMaker`, `Get8Bytes4KPerSecond`, `Get9Bytes90KPerSecond`, `Get10Bytes14MPerSecond`, `Get11Bytes900MPerSecond`, `Get12BytesUltraPerSecond`, `GetForMysql`

### go/crypto v1.5.10
- **v1.5.9**：新增 `EncryptAutoIV`、`EncryptBytesAutoIV`、`EncryptAndEraseAutoIV`，AES-GCM 输出 `[12 字节随机 IV][密文][16 字节 tag]`。公共解密先认证新格式再用原 IV 兼容旧格式；原加密和底层显式 IV API 不变。可选 `AutoIVCipher` 保持旧算法接口兼容，新数据推荐自动 IV。
主流加解密算法与混合加密体系。
- **API**: `NewAESGCM`, `NewRSA`, `NewECDSA`, `NewED25519`, `NewX25519`, `EncryptBytes`, `DecryptBytes`, `Sign`, `Verify`, `MD5`, `SHA1`, `SHA256`, `SHA512`, `HMACSHA256`

### go/file v1.5.10
高性能磁盘 IO 与嵌入式内存文件。
- **API**: `Exists`, `EnsureParentDir`, `Read`, `ReadBytes`, `Write`, `WriteBytes`, `Copy`, `Move`, `Remove`, `Mkdir`, `Search`, `UnmarshalFile`, `MarshalFile`, `PatchFile`, `Archive`, `Compress`, `LoadFileToMemory`

### go/config v1.5.9
支持环境变量覆盖的配置文件加载。
- **API**: `Load`, `To`

### go/crypto-sm v1.5.9
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
国密 (SM2/3/4) 标准实现。
- **API**: `NewSM2`, `SM3`, `SM3ToHex`, `SM3ToBase64`, `SM3ToURLBase64`, `NewSM4CBC`, `NewSM4GCM`, `Encrypt`, `Decrypt`

### go/document v1.5.10
极简、高效的 Office 文档桥梁，支持 Excel/Word/PPT/PDF/Graph/CSV/MD 与 JSON/Markdown 互转。
- **API**: `Open`, `Create`, `Save`, `ToJSON`, `ToMarkdown`, `ToMarkdownWithAssets`, `ReadText`

### go/vision v1.5.9
高性能图像处理、二维码/条码、FFmpeg 视频编排与媒体预览工具。
- **API**: `Load`, `Save`, `Convert`, `New`, `ParseColor`, `RandColor`, `Capture`, `Recognize`, `GenerateImagePreview`, `GenerateVideoPreview`, `GenerateAudioPreview`, `NewAnimation`, `NewVideo`, `ProcessVideoFrames`

### go/watch v1.5.11
高性能、AI 友好的文件变动监听。
- **API**: `Start`, `EasyStart`, `Watcher`

### go/keys v1.5.12
- **v1.5.11**: AES-GCM 密钥文件、密码文件、CLI/REPL 写入随机 IV 新格式，兼容旧读取和导出回调；CBC/SM4 不变。使用正式 crypto v1.5.9、crypto-sm v1.5.8 验证，无 replace；须先升级接收端。
密钥管理与跨语言加固加密工具。
- **CLI 命令**：`keys list/create/remove`、`keys export <名> <语言>`、`keys keep-key <名> [--ttl 时长]`、`keys forget-key <名>` / `keys forget-key --all`、`keys <名> list/create/remove/encrypt/decrypt`。
- **临时导出授权**：按用户及密钥库隔离的内存代理，支持跨终端导出、可选 TTL、源文件指纹失效和主动清除；不持久化凭证或缓存主密码，密码管理命令仍独立验证。
- **导出与存储**：五种语言保留 12～16 字节 IV；Go 直接设置默认 AES（观察者需在包变量初始化时注册）。严格密钥认证、目录边界约束、独占创建及 Unix 0600 敏感文件权限。
- **新增 Library API**：`RemoveKeystore`、`KeySet.SourceFingerprint`。Windows 代理和库可交叉编译，CLI 仍受 shell v1.5.8 平台隔离问题阻塞。

### go/log v1.5.20
- **Query API**: `QueryOptions`, `LogPath`, `DefaultConfig`, `Query`, `QueryFile`, `FormatStream`, `FormatArchiveStream`, `RunCommand`, `FileWriter.Err`, `Config.NoCompress`.
高性能 Meta 驱动的异步脱敏日志。
- **API**: `Debug`, `Info`, `Warning`, `Error`, `As`, `New`, `NewLogger`, `SetDefaultConfig`, `SetDefaultName`, `Viewable`, `ToJSON`, `GetEntry`, `WithEntry`, `RegisterType`, `GetMeta`, `LoadMeta`, `SetMetaFilePath`, `Marshal`, `RegisterWriterMaker`, `AddStdLogFilter`, `SetStdLogOutput`, `GetDroppedLogs`, `WriterService.Start`, `WriterService.Stop`, `WriterService.Status`
- **文件输出**：默认 `.gz` + `.dict` 实时压缩，NoCompress=true 保留旧 JSON 数组明文；空 SplitTag 使用固定文件，非空按标签分割。服务启停外同步刷新，运行中异步缓冲写入。

### go/http v1.5.18
- **External address**: `ExternalAddressPolicy`, `NewExternalAddressResolver`, `ExternalAddressResolver.Prepare`, `RequestExternalAddress`, `PreparedExternalAddress`, `ExternalAddress.IsHTTPS/SameOrigin/RelayHeaders`. Default controlled-service Request-ID relay; optional Mode direct/trusted and direct-peer CIDRs. Paired single-value forwarding headers, pinned snapshots and structured Origin checks; Forwarded is unsupported. Request-ID is relay context, not authentication.
- **JS 请求契约**：JS GET/DELETE 保留结果对象并传播请求取消；DELETE Multipart 检查文件授权。
- **WebSocket**：客户端 WebSocket/WebSocketContext 改为 Open/OpenContext，返回连接、握手响应、错误；http.Header 保留多值。新增 Client.Clone、WebSocketDialer、SetWebSocketDialer，支持独立 HTTP/1.1 配置；拒绝正文有限保留并归一化长度。
极致精简的高性能 HTTP 客户端。
- **API**: `NewClient`, `NewClientH2C`, `Get`, `Post`, `Put`, `Delete`, `Head`, `Do`, `DoContext`, `ManualDoContext`, `To`, `Open`, `OpenContext`, `Client.Clone`, `Client.WebSocketDialer`, `Client.SetWebSocketDialer`, `Client.SetWebSocketHTTP2`, `Client.SetWebSocketOptions`, `IsWebSocketRequest`, `UpgradeWebSocket`

### go/mail v1.5.10
极致精简的高性能邮件客户端。
- **API**: `Send`, `MustSend`, `Recv`, `MustRecv`, `New`, `MustNew`, `NewWithConfig`, `GetMailbox`, `ParseAddr`, `FormatAddr`

### go/task v1.5.17
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
轻量级任务调度与生命周期管理。
- **API**: `Add`, `Scheduler.Start`, `Scheduler.Stop`, `Get`, `List`, `Remove`, `Run`, `WithPolicy`, `WithTimeout`, `NewScheduler`, `WithLogger`, `Logger`, `State`, `Snapshot`, `Disable`, `Enable`, `Config.FailureRetryDelay`, `Snapshot.RetryAt`
- **队列库**: `github.com/api-go/task/queue`: `Add`, `Fetch`, `FetchDecoded`, `Finish`, `AddAfter`, `Retry`, `Fail`, `Stats`, `PeekFailed`

### go/redis v1.5.24
- **v1.5.22**: Redis.StartAsync provides nonblocking subscription recovery; Stop cancels reconnect waits; reset callbacks run outside locks after acknowledgement; PUBLISH reports zero-subscriber success.
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
集成 Pub/Sub 的高性能 Redis 客户端。
- **API**: `GetRedis`, `NewRedis`, `Do`, `Subscribe`, `PUBLISH`, `NewIDMaker`, `SetConfig`, `SetConfigIfAbsent`, `ZRangeByScore`
- **ID 重建边界**: 命名连接池替换后丢弃旧预留序号；业务数据保留时，Redis ID 计数器也必须保留。

### go/starter v1.5.16
- **Built-in commands**: `log` (default -tail 100 -f) and `logv`; dispatched before lifecycle startup, custom AddCommand can override.
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
服务生命周期与后台运行管控。
- **API**: `Register`, `Start`, `Wait`, `SetAppInfo`, `SetUsage`, `AddCommand`, `AddRemoteCommand`, `OnStarting`, `OnStarted`, `OnStopping`, `OnStopped`

### go/api v1.5.23
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
已发布修订：动态 Action 配置不混入供应商请求体，保留继承的显式 payload 默认值及调用方业务字段。
**WebSocket**: managed WebSocket uses HTTP OpenContext and closes handshake responses.

CallOptions.Mode=mock 使用声明的测试输入/应答，零网络调用，明确标记模拟。
第三方 API 调度引擎，消除 SDK 摩擦。
- **API**: `Call`, `CallBy`, `Load`, `RegisterAction`, `RemoveAction`, `RegisterSigner`, `RegisterJSSigner`, `GetSigner`, `RemoveSigner`, `RegisterFilter`, `RegisterJSFilter`, `RemoveFilter`, `ParseActionYAML`, `PatchActionTokens`, `ConvertActionJSONToYAML`, `ModelConfigured`, `Action`, `CallOptions`, `MockInputError`, `Result`

### go/db v1.5.26
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
意图优先的极简数据库抽象层，支持影子删除与自动版本。
- **API**: `GetDB`, `Sync`, `To`, `ToSlice`, `Insert`, `Replace`, `Update`, `Delete`, `Query`, `Exec`, `Begin`, `SetConfig`
- **SQLite 全文**: 使用整数 rowid 关联字符串业务主键，单表 Schema 与全文结构迁移统一提交或回滚。
- **JSON 结果解码**：声明 JSON/JSONB 列的字符串或字节对象/数组解码到 `any` 目标；显式字节目标、普通 BLOB、无效 JSON 与 NULL 保持原值。公开 API 不变。
- PostgreSQL Schema 同步：按原始生成命名（含长名称 hash）事务同步普通/唯一索引，保护约束支撑及外部命名索引；公开 API 不变。
- 固定 CHAR/BPCHAR 查询字符串去除右侧存储补空格；前导空白、VARCHAR/TEXT 尾空格保留。

### go/discover v1.5.23
- **v1.5.21**：Go 及 Python/Node.js/Java/Ruby/常驻 PHP 异步启动恢复任务；Start 表示任务启动，IsRegistered/isRegistered 单独表示注册状态；周期快照补偿通知丢失，默认服务端健康未注册时 503。调用失败只影响本地评分，不删除全局注册。使用显式本地 Redis replace，已发布并升级下游。
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
- **External context**: `PrepareExternalRequest` explicitly prepares native ingress with HTTP policy. Normalized browser context is relayed separately from RPC destinations, credentials and TLS; raw legacy context is not trusted evidence. No default Origin relay.
- **WebSocket**：Caller.Open/OpenContext 返回连接、响应、节点、错误；Caller.WebSocketClient 注入 TLS/Dialer。业务握手拒绝不重试、不摘节点，瞬时失败保留切换；消除 Redis 订阅/reset 锁反转。
- **SDK**：原生 Go、Java、Python、Node.js/TypeScript、PHP 常驻/FPM、Ruby 源码随 tag 发布；未上传包仓库。统一 Header/X-App-* 续传、连续失败清零；固定 GET /_discover/health 默认 200/OK，可自定义。

极简的服务发现与负载均衡调用。
- **API**: `Init`, `Start`, `Stop`, `Wait`, `EasyStart`, `NewCaller`, `Get`, `Post`, `Put`, `Delete`, `Head`, `Caller.Open`, `Caller.OpenContext`, `Caller.WebSocketClient`, `AddExternalApp`, `GetAppNodes`, `SetNode`, `SetLoadBalancer`, `SetRoute`, `SetHTTPClient`, `Caller.DoRequest`, `HealthPath`, `HealthHandler`, `SetHealthHandler`, `Middleware`, `PrepareRequest`, `NodeInfo.State`

### go/service v1.5.55
- **Logging**: `ServiceConfig.CompactProxyLog` (default false), `ProxyLog`; service.Start/starter.Start expose embedded log/logv. Static and business RequestLog remain enabled.
- **v1.5.22**: asynchronous Discover startup/cleanup integration; registration readiness is separate from worker startup. Development uses explicit Discover/Redis replacements; released and downstream upgraded.
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
- **External addressing**: `ServiceConfig.ExternalAddress`, `WebServer.SetExternalAddressPolicy`, `Request.ExternalAddress`; pinned safe MakeUrl, HTTPS redirects and transparent proxy relay. Preparation precedes missing Request-ID generation; incoming internal IDs preserve outer addressing by default. Optional direct/trusted modes are independent of ClientIPPolicy; RPC targets and credentials are unchanged.
- JavaScript 使用 esbuild 空白压缩，关闭语法折叠和标识符改名；解析器定位内嵌 HTML 模板，实体转换若改变 JS 转义或插值边界则仅跳过该模板优化。HTML 保留结构标签、引号、默认属性和注释；缓存策略版本隔离旧压缩结果，两种静态源均有 HTTP 执行与生命周期回归。
- 静态压缩缓存按资源作用域、路径和内容隔离，覆盖挂载替换。
- **代理 API**：ServiceConfig.WebSocketProxy 设置握手/写入/空闲超时、消息限制及压缩；WebServer.SetProxyHTTPClient / SetProxyWebSocketDialer 配置传输。发现代理保留握手响应，流式失败不提交截断消息；
**WebSocket**: Discover WebSocket proxy preserves handshake cookies and rejection responses.
- **WebSocket**：鉴权后的 WebSocket 代理支持协商 H2，并为 H1 回退使用独立连接；普通请求保留 HTTP/2 / H2C。
- 代理写正文前提交上游状态码，保留 Location、多值 Set-Cookie 与公开 Host。
- **Discover 集成**：自动挂载健康接口；可信 IP 解析后补齐入口元数据，来源字段统一。

核心微服务框架。
- **API**: `Start`, `AsyncStart`, `Host`, `Register`, `Restful`, `RegisterWebsocket`, `Static`, `Proxy`, `VerifyStruct`, `GetInjectT`

### go/gateway v1.5.28
- **Host 回收站**：删除保留完整草稿/发布/历史与加密凭据；恢复原发布配置并保留独立草稿，冲突拒绝、修订号递增；仅回收站可永久删除。复用共享状态 CAS、同步、重启/灾后恢复、脱敏与按 Host 授权 API。
- **ACL**：Scope 保护范围 + Allow 放行条件，范围内默认拒绝、放行 OR、重叠范围 AND；规则摘要列表与独立编辑弹窗、中立的空 ACL 路径、ACL/限流自动摘要与稳定 ID。NewACL / ACL.Evaluate / ACLRule / ACLGrant / ACLDecision，兼容旧开发规则。Gateway 保持纯 L7。
- **AES-GCM 兼容性**：正式依赖选中 crypto v1.5.9，共享对称解密支持随机 IV 新格式和原固定 IV 格式，原公开 API 不变。
- **External addressing**: independent `Config.ExternalAddress` / `Config.AdminExternalAddress`; HTTPS reverse-proxy login, Secure Cookie and management writes use one HTTP snapshot. Business ingress defaults to direct and overwrites client metadata even with a supplied ID. AdminHandler defaults to controlled internal relay, so HTTPS self-proxy works without source configuration. Optional policies enhance each independent listener.
- **认证补丁**：永久 API Key 兼容零时刻及旧零时间的时区序列化，真实过期与 Host 权限仍生效；UTC、上海、纽约持久化及重启验证通过。
- **会话保持与集群**：Host.AffinityRules支持off/auto/hash/manual、多路径/方法规则和主备链；本地自动映射、短期增量日志、加密分页快照与检查点，无请求路径Redis访问。共享4096分片在拓扑/负载齐备后一次低负载优先分配，无定时迁移配额；内部版本防旧同步，HTTP/2后续请求用新表、既有WS/SSE保留原上游。配置/密钥恢复及Service.Register复用。
高性能、事件驱动的动态 API 网关。
- **管理**：默认原生 Host 后台、草稿/发布/回滚、节点/Redis 限流、严格入口信任、集中加密证书与按域名自适应 HTTPS；Hosts 与监控按添加时间统一排序。单管理员 Cookie/CSRF 会话加密持久化，八小时内跨重启保留。
- **程序接入**：按 Host/操作授权的命名 API Key、到期撤销、Bearer Host 接口及可复制 TXT 指引；每次校验权威凭据，程序 Key 不可修改监控脚本或报警绑定。
- **测试与发现**：配置测试点击立即校验且不请求上游；独立有界 GET 业务测试；注册中心只读展示全部服务、多地址与实际调用协议。Gateway 只作为发现客户端，解除自身注册。
- **监控与报警更新**：小时/日格按最新结果判红绿，失败显示成功/总次数，最多5个实际红绿点、缺失留空；通道集中选择Host（默认全部）和连续失败阈值（默认3），共用监控样本，策略修改保留计数；勿扰及重复提醒独立控制发送。
- **监控**：已发布代理 Host 默认启动、逐域名、每 60 秒检查，默认 2xx/3xx 通过。周期矩阵展示次数、平均耗时、失败数和一份代表性响应，最近失败优先，旧数据缺失明确标注。每 Host 单 Hash 最多 30 日桶、24 小时桶、10 报警状态槽；应用日期日志默认保留 30 天。
- **报警**：加密钉钉/企微/飞书通道、API 原生签名、连续失败阈值、重复提醒、勿扰和独立 HTTP 低代码，提供钉钉示例；签名与回执通过本地接收端验证，真实 OA 投递需按环境验证。
- **通知与 WebSocket**：Redis 订阅随生命周期启停；普通请求保持 HTTP/2/H2C，WebSocket 支持 H2 协商及 H1 回退并保留握手响应。
- **依赖**：正式 Service v1.5.52、Discover v1.5.21、HTTP v1.5.16、API v1.5.21、JS v1.5.17，无本地 replace。
- **库**：`github.com/api-go/gateway/core`；既有证书、限流、密码与配置接口继续支持，根目录保留 CLI。完整 API：[中文](https://github.com/api-go/gateway/blob/main/README.md)、[English](https://github.com/api-go/gateway/blob/main/README.en.md)。
- **API**: `NewGatewayApp`, `GatewayApp.Start`, `GatewayApp.Stop`, `GatewayApp.Reload`, `GatewayApp.Status`, `NewManager`, `Manager.AdminHandler`, `Manager.SaveDraft`, `Manager.Publish`, `Manager.Rollback`, `Manager.Delete`, `Manager.Trash`, `Manager.Restore`, `Manager.Purge`, `DeletedHost`, `Manager.CheckHost`, `Manager.TestUpstream`, `Manager.RegistryServices`, `ReadRegistryServices`, `Manager.MonitorStatuses`, `Manager.MonitorHistory`, `Manager.MonitorMatrix`, `Manager.MonitorTick`, `Manager.RunMonitorCheck`, `Manager.SendAlert`, `Manager.SyncAffinity`, `Manager.AffinityStatus`, `AffinityConfig`, `AffinityRule`, `AffinityMapping`, `PruneGatewayLogs`

## RFC 8441 WebSocket：HTTP v1.5.14 / Service v1.5.48 / Gateway v1.5.20

- HTTP 新增 `Client.SetWebSocketHTTP2`、`Client.SetWebSocketOptions`、`IsWebSocketRequest`、`UpgradeWebSocket`，保留 Gorilla 连接 API；支持 H2/H2C、流隔离和连接复用。Open 默认智能协商 WSS，业务拒绝与证书错误不降级。
- Service 原生路由与代理接受 H2 CONNECT；上游 WSS 优先 H2，仅协议不支持时回退 H1；普通 WS 使用 H1，无新增配置。
- Gateway 通过 Service 支持 H2 WebSocket，覆盖 TLS 多流与路由更新；服务端须在启动前设置 `GODEBUG=http2xconnect=1`。
- 正式依赖顺序 HTTP → Service → Gateway；完整链路以 `GOWORK=off`、无本地 replace 验证。

## Default external address relay / 默认外部地址续传

Released and remote-tag verified: HTTP v1.5.16 / Discover v1.5.19 / Service v1.5.50 / Gateway v1.5.22.

Default addressing restores the existing controlled-service Request-ID relay convention: no incoming ID uses actual TLS/Host before generating an ID; subsequent internal hops preserve the first external address with no extra configuration. Public Gateway business ingress explicitly defaults to direct and overwrites client metadata even with a supplied ID; its independent AdminHandler defaults to internal relay, so HTTPS self-proxy login and Secure Cookie work without configuring sources.

`ExternalAddressPolicy.Mode`: empty/legacy for controlled internal relay, direct for actual connection only, trusted for explicit direct-peer restrictions. Supplying TrustedProxies without Mode retains the released explicit-proxy behavior. Origin stays unchanged and RPC destinations/credentials remain independent. Strict configuration is optional. Development integration used explicit local replace before user acceptance; release validation uses GOWORK=off and released dependencies without replace.

## AES-GCM 自适应解密联动发布（2026-10-26）

16 个受影响模块均已发布并核实远端 tag；各下游依赖图统一选中 crypto v1.5.9，无 replace。keys 的 AES-GCM 新写入携带 12 字节随机 IV，公共对称解密兼容新旧格式。已经编译的应用仍须升级依赖并重新构建，再接收新格式数据。完整版本与验证矩阵见[发布验证](TEST.md)。

## Web

- [state](https://github.com/api-go/state) — [@api-go/state](https://www.npmjs.com/package/@api-go/state), v1.0.29
- [bootstrap](https://github.com/api-go/bootstrap) — [@api-go/bootstrap](https://www.npmjs.com/package/@api-go/bootstrap), v1.0.16
- [ui](https://github.com/api-go/ui) — [@api-go/ui](https://www.npmjs.com/package/@api-go/ui), v1.0.12

## 实时压缩日志正式发布 — 2026-11-12

Log v1.5.19 / Starter v1.5.16 / Discover v1.5.23 / Service v1.5.54 / Gateway v1.5.28 已发布并核验 GitHub 远端 tag。联动调用方使用正式依赖，无本地开发 replace，GOWORK=off 测试和基准通过。

文件日志默认实时分块压缩，每个文件使用独立 `.dict`；两份文件必须成对备份、迁移和删除，普通 zcat 不能恢复记录。通过 `logv` 或可执行文件内置 `log`/`logv` 读取。`./server log` 默认 `-tail 100 -f`；显式 `-tail N`、`-head N`、`-cat` 选择范围，解码后可管道 grep/awk；`-json` 输出对象 JSONL，`-raw` 输出数组 JSONL。NoCompress 可保留明文，旧明文可继续读取。

通过 service.Start() 或 starter.Start() 获得命令分流；AsyncStart 单独使用不提供该入口。业务依赖初始化放到生命周期 Start，避免读日志时启动业务。业务服务保留 RequestLog，Discover 出站 CallLog；Gateway 纯代理使用精简 ProxyLog、失败增加有界脱敏诊断，静态文件仍有 RequestLog。使用请求注入的 Logger 续传同一 TraceID。

接入示例和完整规范：[Service README](https://github.com/api-go/service/blob/v1.5.54/README.md)。正式验证：[TEST.md](../TEST.md)。


## 2026-11-13 日志更新

Log v1.5.20、Service v1.5.55：默认彩色可视化，-json 无 ANSI；`./server log -tail -f -json` 默认最近 100 条并跟随。压缩仅用于文件写入，控制台和其他写入器不压缩。
