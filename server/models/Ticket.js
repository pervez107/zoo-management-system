const mongoose = require('mongoose');

const ticktetSchema= mongoose.Schema({
    visitorName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    visitDate:{
        type:Date,
        required:true,
    },
    adultCount:{
        type:Number,
        required:true,
        default:0,
    },
    childCount:{
        type:Number,
        required:true,
        default:0,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:['Pending', 'Paid'],
        default:'Pending',
    },
    ticketId:{
        type:String,
        unique:true,
    }
},{
    timestamps:true,
});

module.exports=mongoose.model('Ticket',ticktetSchema);