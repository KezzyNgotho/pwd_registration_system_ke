const express = require("express");
const cors = require("cors");
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const ccpPath = path.resolve(__dirname, "..", "test-network", "organizations", "peerOrganizations", "org1.example.com", "connection-org1.json");
const walletPath = path.join(__dirname, "wallet");

async function connectToNetwork() {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: "admin", discovery: { enabled: true, asLocalhost: true } });
    return gateway.getNetwork("mychannel");
}

app.post("/register", async (req, res) => {
    try {
        const { id, name, age, disabilityType, address } = req.body;
        const network = await connectToNetwork();
        const contract = network.getContract("pwdReg");
        await contract.submitTransaction("RegisterPWD", id, name, age.toString(), disabilityType, address);
        res.status(200).send({ message: "PWD Registered Successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/pwd/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const network = await connectToNetwork();
        const contract = network.getContract("pwdReg");
        const result = await contract.evaluateTransaction("QueryPWD", id);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
