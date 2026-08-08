# UbudKusChain Explorer

Web explorer for a UbudKusChain node. The server-side Next.js API connects to
the node's current gRPC services (`BlockService`, `TransactionService`, and
`AccountService`); the browser never connects directly to a validator.

## GitHub Pages

A static overview page describing this project is hosted on GitHub Pages and
built from the `ghpages/` folder by the unified `.github/workflows/release.yml`
workflow. After enabling Pages (Settings → Pages → Source: **GitHub Actions**),
the site is available at:

```text
https://jhonkus.github.io/UbudKusChain-explorer-web/
```

Edit the files under `ghpages/` to update the landing page. A pull request
targeting `main` is processed after it is merged successfully; the workflow
runs the quality checks, creates the release, and deploys the updated Pages artifact.

## Configuration

Copy `.env.example` to `.env.local` and set the gRPC endpoint:

```text
UKC_NODE_GRPC_URL=127.0.0.1:5000
```

Use the node's native gRPC port, not the CometBFT RPC port `26657`. The
explorer connects server-to-server, so the node endpoint must be reachable
from the Next.js process and must not be exposed directly to browsers.

For remote deployments, use a private network or TLS-protected gRPC endpoint.
The node's `API_AUTH_TOKEN` and `API_TLS_CERT_*` settings protect its
browser-facing gRPC-Web port; configure network policy and credentials for the
native gRPC port used by this explorer separately.

## Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run typecheck
npm run lint
npm run build
```

## Releases

The release version is kept in the root `VERSION` file and follows Semantic
Versioning (`MAJOR.MINOR.PATCH`). The initial development release is `0.1.0`.

Before merging a release PR into `main`, update `VERSION`:

- Increment `PATCH` for backward-compatible fixes, such as `0.1.1`.
- Increment `MINOR` for backward-compatible features, such as `0.2.0`.
- Increment `MAJOR` for breaking changes, such as `1.0.0`.

The release workflow processes merged pull requests targeting `main`. It runs
typecheck, lint, tests, and the production build, then validates the version,
creates a GitHub Release with the matching `vX.Y.Z` tag, and deploys the
`ghpages/` content to GitHub Pages. Each version must be used only once.

The explorer's API routes proxy read-only node queries and return `502` when
the configured node is unavailable. The node adapter is in `grpc/client.js`;
its protobuf contracts are kept in `grpc/protos/*node.proto` and must match the
node repository's `UbudKusChain/Protos` definitions.

## Supported Data

The explorer currently reads blocks, transactions, pending transactions,
accounts, search results, chain statistics, pool statistics, and transaction
charts from the node's gRPC services. Search uses the node's block, transaction,
and account read models. Chart data is bounded by the node read model and is
not intended to replace a scalable external indexer.

## Production Notes

- Run Next.js behind HTTPS and an application reverse proxy.
- Keep `UKC_NODE_GRPC_URL` server-side; never expose it as a browser variable.
- Use a dedicated read-only node or gateway for public explorer traffic.
- Monitor `502` responses, node health, and explorer latency.
- Do not commit `.env.local`, certificates, API keys, or private node data.
