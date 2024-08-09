import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    agent: { type: String, required: true },
    contact: { type: String, unique: true, required: true },
    doj: { type: String, required: true },
    pwd: { type: String, required: true },
    expo: { type: Number, required: true },
    clientCommType: { type: String, required: true },
    clientCommMatch: { type: Number, required: true },
    clientCommSSN: { type: Number, required: true },
    chips: { type: Number, required: true },
    status: { type: String, required: true }
});

const Client = mongoose.model('Clients', clientSchema);

export { Client };