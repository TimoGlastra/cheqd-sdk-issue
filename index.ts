import { Agent, DidsModule } from "@credo-ts/core";
import { agentDependencies } from "@credo-ts/node";
import { AskarModule } from "@credo-ts/askar";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";
import {
	CheqdDidCreateOptions,
	CheqdDidRegistrar,
	CheqdDidResolver,
	CheqdModule,
} from "@credo-ts/cheqd";

const agent = new Agent({
	modules: {
		askar: new AskarModule({ ariesAskar }),
		dids: new DidsModule({
			resolvers: [new CheqdDidResolver()],
			registrars: [new CheqdDidRegistrar()],
		}),
		cheqd: new CheqdModule({
			networks: [
				{
					network: "testnet",
					rpcUrl: process.env.CHEQD_RPC_URL,
					cosmosPayerSeed:
						process.env.CHEQD_SEED ??
						"vacuum potato dawn manage dolphin ten enroll announce train lava brown tumble",
				},
			],
		}),
	},
	config: {
		label: "cheqd test",
		walletConfig: {
			id: "cheqd-test",
			key: "cheqd-test",
		},
	},
	dependencies: agentDependencies,
});

async function run() {
	await agent.initialize();

	const didResult = await agent.dids.resolve(
		"did:cheqd:testnet:fb8a3467-a72d-41d7-bde0-50c85febbef4",
	);

	// ✅ resolving
	console.log(JSON.stringify(didResult, null, 2));

	const didCreateResult = await agent.dids.create<CheqdDidCreateOptions>({
		method: "cheqd",
		options: {
			methodSpecificIdAlgo: "uuid",
			network: "testnet",
		},
		secret: {
			verificationMethod: {
				id: "key-1",
				type: "Ed25519VerificationKey2018",
			},
		},
	});

	// ❌ writing
	console.log(JSON.stringify(didCreateResult, null, 2));
}

run();
