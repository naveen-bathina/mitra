import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // This refers to the User collection
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
