import mongoose from 'mongoose';


const invoiceSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    invoiceNo:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    netAmount: {
        type: String,
        required: true
    },
    poNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Invoice =
  mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

  export default Invoice;

