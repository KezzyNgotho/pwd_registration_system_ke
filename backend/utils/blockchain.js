const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const channelName = 'pwdchannel';
const chaincodeName = 'pwd-contract';
const walletPath = path.join(__dirname, '../wallet');

async function connectToBlockchain() {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    
    const ccpPath = path.resolve(__dirname, '../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    return { gateway, contract };
}

module.exports = { connectToBlockchain };
