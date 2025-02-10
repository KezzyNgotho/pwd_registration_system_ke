const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function main() {
    try {
        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Path to connection profile
        const ccpPath = path.resolve(__dirname, '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new gateway for connecting to the peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network channel
        const network = await gateway.getNetwork('pwdchannel');
        const contract = network.getContract('pwd-contract');

        // Test functions here
        const result = await contract.evaluateTransaction('queryAll');
        console.log(`Query result: ${result.toString()}`);

        gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
