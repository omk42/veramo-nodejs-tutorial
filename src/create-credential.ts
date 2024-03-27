import { agent } from './veramo/setup.js'

async function main() {
  const issuer = await agent.didManagerGetByAlias({ alias: 'default' })
  const holder = await agent.didManagerGetByAlias({ alias: 'default-web' });
  
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: issuer.did },
      credentialSubject: {
        id: holder.did,
        you: 'Rock',
      },
    },
    proofFormat: 'jwt',
  });

  await agent.dataStoreSaveVerifiableCredential({verifiableCredential: verifiableCredential});

  console.log(`New credential created`)
  console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.log)