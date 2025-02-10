import { Contract } from 'fabric-contract-api';

export class PWDContract extends Contract {
    async registerPWD(ctx, id, data) {
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(data)));
        return data;
    }
}
