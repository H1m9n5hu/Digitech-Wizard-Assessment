import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const miniAdminSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    admin: { type: String, required: true },
    contact: { type: String, unique: true, required: true },
    doj: { type: String, required: true },
    pwd: { type: String, required: true },
    subadminMatchShr: { type: Number, required: true },
    subadminCasinoShr: { type: Number, required: true },
    subadminCommType: { type: String, required: true },
    subadminCommMatch: { type: Number, required: true },
    subadminCommSSN: { type: Number, required: true },
    chips: { type: Number, required: true },
    status: { type: String, required: true }
});

const MiniAdmin = mongoose.model('MiniAdmin', miniAdminSchema);

export { MiniAdmin };