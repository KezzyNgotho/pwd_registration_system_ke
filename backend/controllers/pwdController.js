const { connectToBlockchain } = require('../utils/blockchain');

const pwdController = {
    async registerPWD(req, res) {
        const { gateway, contract } = await connectToBlockchain();
        try {
            const result = await contract.submitTransaction(
                'createRecord',
                req.body.id,
                JSON.stringify(req.body)
            );
            res.json({
                success: true,
                data: JSON.parse(result.toString())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        } finally {
            gateway.disconnect();
        }
    },

    async getAllRecords(req, res) {
        const { gateway, contract } = await connectToBlockchain();
        try {
            const result = await contract.evaluateTransaction('queryAllRecords');
            res.json(JSON.parse(result.toString()));
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            gateway.disconnect();
        }
    },

    async getRecordById(req, res) {
        const { gateway, contract } = await connectToBlockchain();
        try {
            const result = await contract.evaluateTransaction('queryRecord', req.params.id);
            res.json(JSON.parse(result.toString()));
        } catch (error) {
            res.status(404).json({ error: 'Record not found' });
        } finally {
            gateway.disconnect();
        }
    },

    async updateRecord(req, res) {
        const { gateway, contract } = await connectToBlockchain();
        try {
            const result = await contract.submitTransaction(
                'updateRecord',
                req.params.id,
                JSON.stringify(req.body)
            );
            res.json({
                success: true,
                data: JSON.parse(result.toString())
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            gateway.disconnect();
        }
    },

    async deleteRecord(req, res) {
        const { gateway, contract } = await connectToBlockchain();
        try {
            await contract.submitTransaction('deleteRecord', req.params.id);
            res.json({
                success: true,
                message: 'Record deleted successfully'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            gateway.disconnect();
        }
    }
};

module.exports = pwdController;
