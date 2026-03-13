# Sekai Sonolus Server

A [Sonolus](https://sonolus.com) server for Project Sekai: Colorful Stage!.

## Deployment

### Install Node.js

Install LTS version of [Node.js](https://nodejs.org).

### Download Release

Download and extract release.

### Install Dependencies

```bash
npm ci --omit=dev
```

### Configure

Rename `config.example.json` to `config.json` and modify its content. Documentation of config can be found below.

### Run

```bash
node .
```

## Config

### `port`

Server port.

Examples: `8080`.

### `verbose`

Enable verbose logging.

Examples: `true`, `false`.

### `updateInterval`

Interval between updates, in milliseconds.

Examples: `600000`.

### `sonolus.prefix`

Item prefix, should be `kebab-case`.

Examples: `sekai-best`.

### `sonolus.basePath`

Base path, should have leading slash but no trailing slash.

Examples: `/`, `/server`.

### `sonolus.address`

Address, should have no trailing slash.

Examples: `https://my-domain.com`, `https://my-domain.com/server`, `http://127.0.0.1:8080/server`.

### `sonolus.fallbackLocale`

Fallback locale.

Examples: `ja`, `en`.

### `sonolus.bannerPath`

Path to banner image, optional.

Examples: `./path/to/banner.png`.

### `sonolus.packPath`

Path to pack, optional. Use [@sonolus/pack](https://github.com/Sonolus/sonolus-pack) to prepare a pack.

Examples: `./path/to/pack`.

### `sonolus.post.info.author`

Info post author.

### `sonolus.post.info.description`

Info post description.

### `sonolus.post.engine.*`

Engine resources.

### `sonolusShare.mode`

Share mode, can be `spa` or `redirect`.

Examples: `spa`, `redirect`.

### `sonolusShare.publicPath`

Path to public when using SPA mode.

Examples: `./path/to/public`.

### `sonolusShare.root`

Redirect root when using redirect mode, should have no protocol.

Examples: `my-domain.com`, `my-domain.com/server`, `127.0.0.1:8080/server`.

### `clients.*.baseUrl`

Client base URL.

Examples: `https://sekai-world.github.io/sekai-master-db-diff`, `https://storage.sekai.best/sekai-jp-assets`, `https://i18n-json.sekai.best`.

### `clients.*.timeout`

Client timeout, in milliseconds.

Examples: `30000`.

### `clients.whitelist.enabled`

Enable whitelist to remove unusable items due to missing assets.

Examples: `true`, `false`.

### `clients.whitelist.threadCount`

Whitelist thread count.

Examples: `5`.

## Building from Source

```bash
npm ci
npm run build
```
