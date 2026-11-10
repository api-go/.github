[English](README.md) | [简体中文](README.zh-CN.md)

# @go Development Guide (INDEX)

## Design Philosophy & Principles

This project provides an ultra-lean, friction-free, secure, and high-performance Go development infrastructure.

- **Unity**: Standardized toolset to reduce cognitive load.
- **Ease of Use**: Simplified APIs for rapid development.
- **Reliability & Security**: Security-first approach in encryption and memory management.
- **Performance**: Optimized for execution efficiency.
- **Problem Solving**: Focuses on core friction points like type conversion and service discovery.

---

## Module Inventory & API Reference

Docs: https://github.com/api-go/


Versions and APIs below refer to released tags; local unreleased changes are not included.

### go/jsmod v1.5.6
Registry for JS modules with unsafe method tracking.
- **API**: `Register`, `GetModules`, `NewContext`, `Get`, `IsSafeMode`, `MakeError`

### go/timer v1.5.1
Time stream control and retries.
- **API**: `Retry`, `Start`, `WithBackoff`, `WithMaxRetries`, `NewDebouncer`, `NewThrottler`, `NewTimeWheel`, `RunTimeout`, `Tracker`

### go/cast v1.5.9
Semantic type conversion and generic utilities.
- **API**: `To`, `Convert`, `As`, `ToMap`, `ToSlice`, `FillMap`, `FillSlice`, `ToJSON`, `ToJSONBytes`, `PrettyToJSON`, `FromJSON`, `UnmarshalJSON`, `ToYAML`, `FromYAML`, `UnmarshalYAML`, `ParseTime`, `FormatTime`, `Int`, `String`, `Bool`, `Duration`, `RealValue`, `GetLowerName`, `GetUpperName`, `FixUpperCase`

### go/rand v1.5.5
High-concurrency random generation.
- **API**: `Int`, `FastInt`, `Float`, `FastFloat`, `Byte`, `Bytes`, `Perm`, `Shuffle`

### go/encoding v1.5.9
Standard and integer encoding.
- **API**: `Hex`, `UnHex`, `Base64`, `UnBase64`, `Base64Raw`, `URLBase64`, `UnURLBase64`, `URLBase64Raw`, `URLEncode`, `UnURLEncode`, `HTMLEscape`, `HTMLUnescape`, `UTF8Valid`, `NewIntEncoder`, `EncodeInt`, `AppendInt`, `DecodeInt`, `ExchangeInt`, `FillInt`, `HashInt`, `FoldInt`, `SortJoin`

### go/js v1.5.18
Named-function validation uses parsed syntax, preserving matching text in literals and comments.
Lightweight low-code engine based on goja with automatic bridging and safe mode.
- **API**: `Define`, `Call`, `CallContext`, `Doc`, `CheckVersion`, `FuncList`, `NewPool`, `Start`, `Stop`, `Status`

### go/shell v1.5.9
Terminal styling and command execution.
- **API**: `Run`, `RunCommand`, `Start`, `InteractiveRun`, `Pipeline`, `PipelineCommands`, `Style`, `StripANSI`, `Red`, `Green`, `Blue`, `Yellow`

### go/safe v1.5.5
Memory protection and secure erasure.
- **API**: `NewSafeBuf`, `NewSafeString`, `LockMemory`, `UnlockMemory`, `DisableCoreDump`, `ZeroMemory`, `EncryptChaCha20`, `DecryptChaCha20`, `MakeSafeToken`, `Concat`, `Base64`, `Hex`, `UrlEncode`

### go/id v1.5.10
Distributed and DB-optimized IDs.
- **API**: `NewIDMaker`, `Get8Bytes4KPerSecond`, `Get9Bytes90KPerSecond`, `Get10Bytes14MPerSecond`, `Get11Bytes900MPerSecond`, `Get12BytesUltraPerSecond`, `GetForMysql`

### go/crypto v1.5.10
- **v1.5.9**: `EncryptAutoIV`, `EncryptBytesAutoIV`, `EncryptAndEraseAutoIV`; AES-GCM writes `12-byte nonce || ciphertext || 16-byte tag`. Common Decrypt authenticates embedded-IV first, then legacy configured-IV; raw explicit-IV APIs and existing encryption remain unchanged. Optional `AutoIVCipher` preserves engine interface compatibility. Prefer automatic IVs for new data.
Mainstream and hybrid encryption.
- **API**: `NewAESGCM`, `NewRSA`, `NewECDSA`, `NewED25519`, `NewX25519`, `EncryptBytes`, `DecryptBytes`, `Sign`, `Verify`, `MD5`, `SHA1`, `SHA256`, `SHA512`, `HMACSHA256`

### go/file v1.5.10
High-performance IO and memory files.
- **API**: `Exists`, `EnsureParentDir`, `Read`, `ReadBytes`, `Write`, `WriteBytes`, `Copy`, `Move`, `Remove`, `Mkdir`, `Search`, `UnmarshalFile`, `MarshalFile`, `PatchFile`, `Archive`, `Compress`, `LoadFileToMemory`

### go/config v1.5.9
Configuration loading with env overrides.
- **API**: `Load`, `To`

### go/crypto-sm v1.5.9
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
National Cryptographic Standard (SM2/3/4).
- **API**: `NewSM2`, `SM3`, `SM3ToHex`, `SM3ToBase64`, `SM3ToURLBase64`, `NewSM4CBC`, `NewSM4GCM`, `Encrypt`, `Decrypt`

### go/document v1.5.10
Lean and high-performance Office bridge, supporting Excel/Word/PPT/PDF/Graph/CSV/MD to JSON/Markdown conversion.
- **API**: `Open`, `Create`, `Save`, `ToJSON`, `ToMarkdown`, `ToMarkdownWithAssets`, `ReadText`

### go/vision v1.5.9
High-performance image processing, QR/Barcode, FFmpeg video orchestration, and transformations.
- **API**: `Load`, `Save`, `Convert`, `New`, `ParseColor`, `RandColor`, `Capture`, `Recognize`, `GenerateImagePreview`, `GenerateVideoPreview`, `GenerateAudioPreview`, `NewAnimation`, `NewVideo`, `ProcessVideoFrames`

### go/watch v1.5.11
AI-friendly file watching.
- **API**: `Start`, `EasyStart`, `Watcher`
- **CLI**: `watch` — 文件变更时执行命令，支持 `-go`/`-web`/`-js`/`-py` 预设

### go/keys v1.5.12
- **v1.5.11**: AES-GCM keystore/password/CLI/REPL writes use embedded random IVs, retaining legacy reads and export callbacks. CBC/SM4 formats unchanged. Release validation uses published crypto v1.5.9 and crypto-sm v1.5.8, without replacements. Upgrade receivers before enabling new writers.
Secret management and cross-language encryption tool.
- **CLI**: `keys list/create/remove`, `keys export <name> <language>`, `keys keep-key <name> [--ttl duration]`, `keys forget-key <name>` / `keys forget-key --all`, `keys <name> list/create/remove/encrypt/decrypt`.
- **Temporary export authorization**: per-user, per-store in-memory agent; cross-terminal exports, optional TTL, source-file fingerprint invalidation, and explicit clearing. No persisted credentials or cached master password; password commands retain their own authentication.
- **Exports and storage**: preserve 12–16 byte IVs in all five languages; Go directly sets default AES (register observers during package variable initialization). Strict keystore authentication, confined paths, exclusive key creation and Unix 0600 secret files.
- **Library additions**: `RemoveKeystore`, `KeySet.SourceFingerprint`. Windows agent/library cross-compile; the CLI remains blocked by shell v1.5.8 platform isolation.

### go/log v1.5.18
Meta-driven asynchronous logging.
- **API**: `Debug`, `Info`, `Warning`, `Error`, `As`, `New`, `NewLogger`, `SetDefaultConfig`, `SetDefaultName`, `Viewable`, `ToJSON`, `GetEntry`, `WithEntry`, `RegisterType`, `GetMeta`, `LoadMeta`, `SetMetaFilePath`, `Marshal`, `RegisterWriterMaker`, `AddStdLogFilter`, `SetStdLogOutput`, `GetDroppedLogs`, `WriterService.Start`, `WriterService.Stop`, `WriterService.Status`
- **File output**: pure JSON arrays for both fixed and rotated files; empty `SplitTag` preserves the filename. Synchronous flush before service start and after stop; asynchronous routing while running.

### go/http v1.5.17
- **External address**: `ExternalAddressPolicy`, `NewExternalAddressResolver`, `ExternalAddressResolver.Prepare`, `RequestExternalAddress`, `PreparedExternalAddress`, `ExternalAddress.IsHTTPS/SameOrigin/RelayHeaders`. Default controlled-service Request-ID relay; optional Mode direct/trusted and direct-peer CIDRs. Paired single-value forwarding headers, pinned snapshots and structured Origin checks; Forwarded is unsupported. Request-ID is relay context, not authentication.
- **JS request contract**: JS GET/DELETE retain response objects instead of entering the error-return slot; HTTP JS calls propagate cancellation and Multipart DELETE authorizes local files.
- **WebSocket**: replace client WebSocket/WebSocketContext with Open/OpenContext, returning connection, handshake response and error; http.Header preserves multiple values. New Client.Clone, Client.WebSocketDialer and Client.SetWebSocketDialer support independent HTTP/1.1 dialing. Rejected bodies are capped and their lengths normalized.
High-performance HTTP client.
- **API**: `NewClient`, `NewClientH2C`, `Get`, `Post`, `Put`, `Delete`, `Head`, `Do`, `DoContext`, `ManualDoContext`, `To`, `Open`, `OpenContext`, `Client.Clone`, `Client.WebSocketDialer`, `Client.SetWebSocketDialer`, `Client.SetWebSocketHTTP2`, `Client.SetWebSocketOptions`, `IsWebSocketRequest`, `UpgradeWebSocket`

### go/mail v1.5.9
Lean and high-performance email client.
- **API**: `Send`, `MustSend`, `Recv`, `MustRecv`, `New`, `MustNew`, `NewWithConfig`, `GetMailbox`, `ParseAddr`, `FormatAddr`

### go/task v1.5.16
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
Task scheduling and lifecycle management.
- **API**: `Add`, `Scheduler.Start`, `Scheduler.Stop`, `Get`, `List`, `Remove`, `Run`, `WithPolicy`, `WithTimeout`, `NewScheduler`, `WithLogger`, `Logger`, `State`, `Snapshot`, `Disable`, `Enable`, `Config.FailureRetryDelay`, `Snapshot.RetryAt`
- **Library**: `github.com/api-go/task/queue`: `Add`, `Fetch`, `FetchDecoded`, `Finish`, `AddAfter`, `Retry`, `Fail`, `Stats`, `PeekFailed`

### go/redis v1.5.23
- **v1.5.22**: Redis.StartAsync provides nonblocking subscription recovery; Stop cancels reconnect waits; reset callbacks run outside locks after acknowledgement; PUBLISH reports zero-subscriber success.
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
Redis client with Pub/Sub.
- **API**: `GetRedis`, `NewRedis`, `Do`, `Subscribe`, `PUBLISH`, `NewIDMaker`, `SetConfig`, `SetConfigIfAbsent`, `ZRangeByScore`
- **ID restart handling**: named pool replacement discards cached reservations before allocation; retaining business data requires retained Redis counters.

### go/starter v1.5.15
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
Service lifecycle and background management.
- **API**: `Register`, `Start`, `Wait`, `SetAppInfo`, `SetUsage`, `AddCommand`, `AddRemoteCommand`, `OnStarting`, `OnStarted`, `OnStopping`, `OnStopped`

### go/api v1.5.22
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
Released patch: dynamic Action configuration stays out of provider payloads; inherited explicit payload defaults and caller fields remain intact.
**WebSocket**: managed WebSocket uses HTTP OpenContext and closes handshake responses.
Third-party API orchestration engine.
- Explicit CallOptions.Mode=mock uses declared test fixtures without networking; MockInputError identifies rejected test inputs; simulated results never imply delivery.
- **API**: `Call`, `CallBy`, `Load`, `RegisterAction`, `RemoveAction`, `RegisterSigner`, `RegisterJSSigner`, `GetSigner`, `RemoveSigner`, `RegisterFilter`, `RegisterJSFilter`, `RemoveFilter`, `ParseActionYAML`, `PatchActionTokens`, `ConvertActionJSONToYAML`, `ModelConfigured`, `Action`, `CallOptions`, `MockInputError`, `Result`

### go/db v1.5.25
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
Convention-over-configuration ORM with shadow-delete, auto-versioning, and FTS.
- **API**: `GetDB`, `Sync`, `To`, `ToSlice`, `Insert`, `Replace`, `Update`, `Delete`, `Query`, `Exec`, `Begin`, `SetConfig`
- **SQLite FTS**: integer rowid links support string primary keys; single-table schema and fulltext migration commit or roll back together.
- **JSON result decoding**: declared JSON/JSONB string or byte objects/arrays decode into `any` destinations; explicit byte destinations, ordinary BLOB, invalid JSON and NULL retain their values. Public API is unchanged.
- Fixed CHAR/BPCHAR string results remove right storage padding; leading whitespace and VARCHAR/TEXT trailing spaces remain unchanged.
- PostgreSQL schema reconciliation: reconcile generated ordinary/unique indexes atomically, including hashed long names; preserve constraint-backed and externally named indexes. No public API change.

### go/discover v1.5.22
- **v1.5.21**：Go 及 Python/Node.js/Java/Ruby/常驻 PHP 异步启动恢复任务；Start 表示任务启动，IsRegistered/isRegistered 单独表示注册状态；周期快照补偿通知丢失，默认服务端健康未注册时 503。调用失败只影响本地评分，不删除全局注册。使用显式本地 Redis replace，已发布并升级下游。
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
- **External context**: `PrepareExternalRequest` explicitly prepares native ingress with HTTP policy. Normalized browser context is relayed separately from RPC destinations, credentials and TLS; raw legacy context is not trusted evidence. No default Origin relay.
- **WebSocket**: Caller.Open/OpenContext returns connection, response, node and error; Caller.WebSocketClient injects TLS/dialer settings. Business handshake rejections do not retry or evict nodes; transient failures retain failover. Redis subscription/reset lock inversion removed.
- **SDK**: native Go, Java, Python, Node.js/TypeScript, resident PHP/FPM and Ruby sources released with the tag; no package-registry uploads. Unified headers/X-App-* relay, consecutive failure reset; extensible GET /_discover/health defaults to 200/OK.

- **Lifecycle**: per-run heartbeat stop/done channels, serialized Start/Stop, captured registration context, repeatable multi-waiter Wait.
Service discovery and load balancing.
- **API**: `Init`, `Start`, `Stop`, `Wait`, `EasyStart`, `NewCaller`, `Get`, `Post`, `Put`, `Delete`, `Head`, `Caller.Open`, `Caller.OpenContext`, `Caller.WebSocketClient`, `AddExternalApp`, `GetAppNodes`, `SetNode`, `SetLoadBalancer`, `SetRoute`, `SetHTTPClient`, `Caller.DoRequest`, `HealthPath`, `HealthHandler`, `SetHealthHandler`, `Middleware`, `PrepareRequest`, `NodeInfo.State`

### go/service v1.5.53
- **v1.5.22**: asynchronous Discover startup/cleanup integration; registration readiness is separate from worker startup. Development uses explicit Discover/Redis replacements; released and downstream upgraded.
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
- **External addressing**: `ServiceConfig.ExternalAddress`, `WebServer.SetExternalAddressPolicy`, `Request.ExternalAddress`; pinned safe MakeUrl, HTTPS redirects and transparent proxy relay. Preparation precedes missing Request-ID generation; incoming internal IDs preserve outer addressing by default. Optional direct/trusted modes are independent of ClientIPPolicy; RPC targets and credentials are unchanged.
- JavaScript uses esbuild whitespace compression without syntax/identifier minification. Parser-selected embedded HTML templates retain JS escape/interpolation boundaries; unsafe entity rewrites skip only the HTML optimization. HTML preserves structural tags, attribute quotes, defaults and comments. Policy-versioned caches exclude former compressor results; HTTP execution and lifecycle tests cover both static sources.
- Static minification cache isolates source scope, path and content, including replaced mounts.
- **Proxy API**: ServiceConfig.WebSocketProxy configures handshake/write/idle timeouts, message limits and compression; WebServer.SetProxyHTTPClient and SetProxyWebSocketDialer configure transports. Discovery handshake responses are preserved; streaming failures never finalize partial messages.
**WebSocket**: Discover WebSocket proxy preserves handshake cookies and rejection responses.
- **WebSocket**: authenticated WebSocket proxy supports negotiated H2 and dedicated H1 fallback connections while ordinary HTTP/2 / H2C calls retain their transport.
- Proxy preserves upstream status before body, Location, multiple Set-Cookie headers and the public Host.
- **Discover integration**: automatic health endpoint and ingress metadata preparation after trusted IP resolution, with unified source headers.

Core microservice framework.
- **Static boundary**: native Static anchors URL suffixes to the registered filesystem root, including encoded traversal paths.
- **Ingress**: `Handler`, `SetRequestGate`, `SetClientIPPolicy`, `RelayClientIP`, `PrepareHostPolicy`, `ReplaceHostPolicies`, `SetCertificateProvider`; request-pinned managed policies and explicit proxy CIDR trust. Legacy internal relay remains the default.
- **API**: `Start`, `AsyncStart`, `Host`, `Register`, `Restful`, `RegisterWebsocket`, `Static`, `Proxy`, `VerifyStruct`, `GetInjectT`

### go/gateway v1.5.26
- **Host trash**: Delete moves complete records into shared persistent trash; restore reactivates the original publication while preserving drafts, with conflict checks and monotonic revisions. Purge only accepts trashed records. Redacted listings, encrypted credentials, CAS convergence, restart/recovery, scoped APIs and explicit confirmations.
- **ACL**: Scope + Allow alternatives, default deny within scope, OR grants and AND overlapping scopes; summary lists with transactional rule dialogs, neutral empty ACL paths, generated ACL/rate summaries and stable IDs. NewACL / ACL.Evaluate / ACLRule / ACLGrant / ACLDecision; legacy development policies remain compatible. Gateway remains L7-only.
- **AES-GCM compatibility**: Released dependencies select crypto v1.5.9; shared symmetric decryption accepts embedded random IVs and legacy configured IVs. Existing public APIs remain unchanged.
- **External addressing**: independent `Config.ExternalAddress` / `Config.AdminExternalAddress`; HTTPS reverse-proxy login, Secure Cookie and management writes use one HTTP snapshot. Business ingress defaults to direct and overwrites client metadata even with a supplied ID. AdminHandler defaults to controlled internal relay, so HTTPS self-proxy works without source configuration. Optional policies enhance each independent listener.
- **Authentication patch**: permanent API keys survive zero-instant and legacy zero-time serialization across UTC, Shanghai and New York; finite expiry and Host permissions remain enforced.
- **Affinity and clustering**: Host.AffinityRules supports off/auto/hash/manual, path/method rules and primary/backup chains. Local auto maps, bounded journal, encrypted paginated snapshots and checkpoints; no request-path Redis access. Shared4096-shard tables allocate low-load-first once topology/reports agree, without timed migration quotas. Internal revisions fence stale synchronization; later H2 requests use the current table while existing WS/SSE retain their upstream. Configuration/key recovery and Service.Register reuse.
High-performance, event-driven dynamic API gateway.
- **Management**: default-enabled native Host UI, drafts/publication/rollback, node/Redis quotas, strict ingress trust, encrypted certificate library and adaptive per-domain HTTPS. Hosts and monitoring share creation order. Sole-administrator Cookie/CSRF sessions are encrypted and survive restarts for eight hours.
- **Program access**: named, scoped, expiring and revocable API Keys; Bearer Host management endpoints and copyable TXT guide. Authoritative credentials are checked on each request. Keys cannot edit monitor scripts or alert bindings.
- **Tests and discovery**: immediate configuration validation without upstream requests; separate bounded GET tests. Read-only native registry lists all services and addresses with actual Gateway caller protocols. Gateway runs as a discovery client and removes its own registration.
- **Monitoring and alert update**: latest-result period colors, successful/total after failure, up to five actual dots with missing results blank. Channels centrally select Hosts (all by default) and failure thresholds (default3), consuming the same monitor samples; policy edits preserve streaks. Quiet hours and reminders control delivery only.
- **Monitoring**: published proxy Hosts start automatically, all domains by default, every 60 seconds; HTTP 2xx/3xx accepted unless configured otherwise. Matrix periods contain counts, average latency, failures and one bounded representative response, preferring the latest failure. Old missing details are explicit. One Hash per Host retains at most 30 daily fields, 24 hourly fields and 10 recent alert-state slots. Dated application logs default to 30 days.
- **Alerts**: encrypted DingTalk/WeCom/Feishu channels, native signatures through API, failure thresholds, repeat reminders, quiet hours and standalone HTTP low-code with a DingTalk example. Real OA delivery remains environment-specific; signing/receipts use local receiver tests.
- **Notifications and WebSocket**: Redis subscriptions follow application lifecycle; normal requests retain HTTP/2/H2C; WebSocket supports negotiated H2 and H1 fallback with preserved handshake responses.
- **Dependencies**: released Service v1.5.52, Discover v1.5.21, HTTP v1.5.16, API v1.5.21 and JS v1.5.17; no local replacements.
- **Library**: `github.com/api-go/gateway/core`; existing certificate, quota, password and configuration APIs remain supported; CLI stays at module root. Full API reference: [中文](https://github.com/api-go/gateway/src/branch/main/README.md), [English](https://github.com/api-go/gateway/src/branch/main/README.en.md).
- **API**: `NewGatewayApp`, `GatewayApp.Start`, `GatewayApp.Stop`, `GatewayApp.Reload`, `GatewayApp.Status`, `NewManager`, `Manager.AdminHandler`, `Manager.SaveDraft`, `Manager.Publish`, `Manager.Rollback`, `Manager.Delete`, `Manager.Trash`, `Manager.Restore`, `Manager.Purge`, `DeletedHost`, `Manager.CheckHost`, `Manager.TestUpstream`, `Manager.RegistryServices`, `ReadRegistryServices`, `Manager.MonitorStatuses`, `Manager.MonitorHistory`, `Manager.MonitorMatrix`, `Manager.MonitorTick`, `Manager.RunMonitorCheck`, `Manager.SendAlert`, `Manager.SyncAffinity`, `Manager.AffinityStatus`, `AffinityConfig`, `AffinityRule`, `AffinityMapping`, `PruneGatewayLogs`

## RFC 8441 WebSocket — HTTP v1.5.14 / Service v1.5.48 / Gateway v1.5.20

- HTTP adds `Client.SetWebSocketHTTP2`, `Client.SetWebSocketOptions`, `IsWebSocketRequest` and `UpgradeWebSocket`, retaining Gorilla connection APIs; H2/H2C streams remain isolated and connections reusable. Open negotiates WSS automatically; business rejections and certificate errors do not downgrade.
- Service accepts H2 CONNECT in native routes/proxies; upstream WSS prefers H2 and falls back to H1 only for unsupported protocol. Ordinary WS uses H1; no new service configuration.
- Gateway inherits H2 WebSocket through Service, including TLS multi-stream and route-update coverage. Set `GODEBUG=http2xconnect=1` before server startup.
- Released dependency order: HTTP → Service → Gateway. Verify the full chain with `GOWORK=off` and no local replacements.

## Default external address relay / 默认外部地址续传

Released and remote-tag verified: HTTP v1.5.16 / Discover v1.5.19 / Service v1.5.50 / Gateway v1.5.22.

Default addressing restores the existing controlled-service Request-ID relay convention: no incoming ID uses actual TLS/Host before generating an ID; subsequent internal hops preserve the first external address with no extra configuration. Public Gateway business ingress explicitly defaults to direct and overwrites client metadata even with a supplied ID; its independent AdminHandler defaults to internal relay, so HTTPS self-proxy login and Secure Cookie work without configuring sources.

`ExternalAddressPolicy.Mode`: empty/legacy for controlled internal relay, direct for actual connection only, trusted for explicit direct-peer restrictions. Supplying TrustedProxies without Mode retains the released explicit-proxy behavior. Origin stays unchanged and RPC destinations/credentials remain independent. Strict configuration is optional. Development integration used explicit local replace before user acceptance; release validation uses GOWORK=off and released dependencies without replace.

## AES-GCM adaptive decryption rollout — 2026-10-26

All 16 affected modules are released and remote-tag verified. Every downstream graph selects crypto v1.5.9 without replacements. New keys AES-GCM writes carry a random 12-byte IV; shared symmetric readers accept both formats. Existing compiled applications must upgrade dependencies and rebuild before receiving new-format data. Full version and validation matrix: [release verification](TEST.md).

## Web

GitHub source releases are available. npm publication under `@api-go` is pending.

- [state](https://github.com/api-go/state) — `@api-go/state`, GitHub v1.0.29
- [bootstrap](https://github.com/api-go/bootstrap) — `@api-go/bootstrap`, GitHub v1.0.16
- [ui](https://github.com/api-go/ui) — `@api-go/ui`, GitHub v1.0.12
