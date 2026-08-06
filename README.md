

# UbudKusCoin Explorer

Web explorer for a UbudKusCoin node. The server-side Next.js API connects to
the node's current gRPC services (`BlockService`, `TransactionService`, and
`AccountService`); the browser never connects directly to a validator.

## Configuration

Copy `.env.example` to `.env.local` and set the gRPC endpoint:

```text
UKC_NODE_GRPC_URL=127.0.0.1:5000
```

Use the node gRPC port, not CometBFT RPC port `26657`. For a remote node, use
an authenticated TLS endpoint and keep the explorer API behind HTTPS.

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

The explorer's API routes proxy read-only node queries and return `502` when
the configured node is unavailable. The node adapter is in `grpc/client.js`;
its protobuf contracts are kept in `grpc/protos/*node.proto` and must match the
node repository's `UbudKusCoin/Protos` definitions.

Search, chart history, and aggregate metrics require dedicated indexer APIs;
they are intentionally reported as unavailable until the node exposes those
read models. This avoids displaying fabricated explorer data.
