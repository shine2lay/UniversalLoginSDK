module.exports = Object.freeze({
  jsonRpcUrl: process.env.JSON_RPC_URL,
  port: 3311,
  privateKey: process.env.PRIVATE_KEY,
  chainSpec: {
    ensAddress: process.env.ENS_ADDRESS,
    chainId: 0
  },
  ensRegistrars: {
    [process.env.ENS_DOMAIN_1]: {
      resolverAddress: process.env.ENS_RESOLVER_1_ADDRESS,
      registrarAddress: process.env.ENS_REGISTRAR_1_ADDRESS,
      privteKey: process.env.ENS_REGISTRAR_1_PRIVATE_KEY
    },
    [process.env.ENS_DOMAIN_2]: {
      resolverAddress: process.env.ENS_RESOLVER_2_ADDRESS,
      registrarAddress: process.env.ENS_REGISTRAR_2_ADDRESS,
      privteKey: process.env.ENS_REGISTRAR_2_PRIVATE_KEY
    },
    [process.env.ENS_DOMAIN_3]: {
      resolverAddress: process.env.ENS_RESOLVER_3_ADDRESS,
      registrarAddress: process.env.ENS_REGISTRAR_3_ADDRESS,
      privteKey: process.env.ENS_REGISTRAR_3_PRIVATE_KEY
    }
  }
});
