const { Contract } = require('fabric-contract-api');

class PWDContract extends Contract {
    async initLedger(ctx) {
        console.log('Initialized PWD Registration System');
    }

    async createRecord(ctx, id, data) {
        const record = JSON.parse(data);
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(record)));
        return record;
    }

    async queryRecord(ctx, id) {
        const recordJSON = await ctx.stub.getState(id);
        if (!recordJSON || recordJSON.length === 0) {
            throw new Error(`Record ${id} does not exist`);
        }
        return JSON.parse(recordJSON.toString());
    }

    async queryAllRecords(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        return JSON.stringify(allResults);
    }

    async updateRecord(ctx, id, newData) {
        const exists = await this.recordExists(ctx, id);
        if (!exists) {
            throw new Error(`Record ${id} does not exist`);
        }
        const updatedRecord = JSON.parse(newData);
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedRecord)));
        return updatedRecord;
    }

    async deleteRecord(ctx, id) {
        const exists = await this.recordExists(ctx, id);
        if (!exists) {
            throw new Error(`Record ${id} does not exist`);
        }
        await ctx.stub.deleteState(id);
    }

    async recordExists(ctx, id) {
        const recordJSON = await ctx.stub.getState(id);
        return recordJSON && recordJSON.length > 0;
    }
}

module.exports = PWDContract;
