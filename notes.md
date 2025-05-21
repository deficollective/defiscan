## contracts

[WIP] To be added to the table:

- all the others below
  | OssifiableProxy | 0x0De4Ea0184c2ad0BacA7183356Aea5B8d5Bf5c6e |
  | ValidatorsExitBusOracle | ... |
  | HashConsensus | 0xD624B08C83bAECF0807Dd2c6880C3154a5F0B288 |

Aragon Agent: 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c (proxy)(impl name = Agent)
Aragon Voting 0x2e59A20f205bB85a89C53f1936454680651E618e
HashConsensus FOR EXIT BUS: 0x7FaDB6358950c5fAA66Cb5EB8eE5147De3df355a
ValidatorsExitBus (proxy OssifiableProxy name ValidatorsExitBusOracle) 0x0De4Ea0184c2ad0BacA7183356Aea5B8d5Bf5c6e
AccountingOracle 0x852deD011285fe67063a08005c71a85690503Cee (proxy) (impl name AccountingOracle)

MEV Boost Relay Allowed List: 0xF95f069F9AD107938F6ba802a3da87892298610E (permission owner)

To check: The legacy oracle, + its Repo contract listed in governance, is it still in use? => Main GateSeal expired but there is a another one for the CSM, most likely created through the blueprint and factory contracts.

{
"name": "GateSeal",
"address": "0xEe06EA501f7d9DC6F4200385A8D910182D155d3e"
},
{
"name": "GateSeal Factory",
"address": "0x6c82877cac5a7a739f16ca0a89c0a328b8764a24"
},
{
"name": "GateSeal",
"address": "0xf9C9fDB4A5D2AA1D836D5370AB9b28BC1847e178"
}
The Last GateSeal was deployed 55 days ago, why is it used? (see docs, there's a community staking module gateseal)

All the Repo and Registry contracts have same logic but different proxy state. To differentiate / explain

MISSING? Node Operators Registry, Simple DVT (specific permissions),

MISSING FROM PERMISSIONS SCRIPT: APMRegistry

All EASYTRACKS listed in the lido scripts config

MAYBE: include bridge contracts in the scope? The emergency brake multisig can stop the bridging to other chains.

TREASURY: 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c
POST TOKEN REBASE RECEIVER: 0xe6793B9e4FbA7DE0ee833F9D02bba7DB5EB27823

Staking MODULES:
Curated: NodeOperatorsRegistry (Proxy): 0x55032650b14df07b85bF18A3a3eC8E0Af2e028d5
Simple DVT: NodeOperatorsRegistry (Proxy): 0xaE7B191A31f627b4eB1d4DaC64eaB9976995b433

## Permission owners

0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c admin of LidoLocator

0x8772E3a2D86B9347A2688f9bc1808A6d8917760C Gate Seal Committee (via 0x1ad5cb2955940f998081c1ef5f5f00875431aa90) (_expired_)

0x98be4a407Bff0c125e25fBE9Eb1165504349c37d Relay Maintenance Committee (MEV Boost Relay Allowed List)

Deposit Guardians

EasyTrack EVMSCriptExecutor: can create payments in Aragon Finance
