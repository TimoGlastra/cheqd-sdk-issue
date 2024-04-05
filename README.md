# To testnet (fails)

```
pnpm install
pnpm ts-node index.ts
```

## To local node with default account (succeeds)

> NOTE: resolving fails because the did doesn't exist, but writing succeeds

```
pnpm install
docker run --rm -d -p 26657:26657 ghcr.io/cheqd/cheqd-testnet:latest
CHEQD_RPC_URL=http://localhost:26657 CHEQD_SEED="sketch mountain erode window enact net enrich smoke claim kangaroo another visual write meat latin bacon pulp similar forum guilt father state erase bright" pnpm ts-node index.ts
```

## To local node with new account (fails):

> NOTE: resolving fails because the did doesn't exist

```
pnpm install
docker run --rm -d --name cheqd -p 26657:26657 ghcr.io/cheqd/cheqd-testnet:latest
docker exec cheqd /bin/sh -c '(echo "silk theme damp share lens select artefact orbit artwork weather mixture alarm remain oppose own wolf reduce melody cheap venture lady spy wise loud"; echo "12345678"; echo "12345678";) | cheqd-noded keys add extra1 --recover'
docker exec cheqd /bin/sh -c '(echo "sketch mountain erode window enact net enrich smoke claim kangaroo another visual write meat latin bacon pulp similar forum guilt father state erase bright"; echo "12345678"; echo "12345678";) | cheqd-noded keys add base --recover'
docker exec cheqd /bin/sh -c '(echo "12345678";) | cheqd-noded tx bank send cheqd1rnr5jrt4exl0samwj0yegv99jeskl0hsxmcz96 cheqd1yeahnxhfa583wwpm9xt452xzet4xsgsqacgjkr 10000000000000000ncheq --from base --gas auto --fees 100000000ncheq --chain-id cheqd -y'
CHEQD_RPC_URL=http://localhost:26657 CHEQD_SEED="silk theme damp share lens select artefact orbit artwork weather mixture alarm remain oppose own wolf reduce melody cheap venture lady spy wise loud" pnpm ts-node index.ts
```