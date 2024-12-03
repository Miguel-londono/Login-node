const {Schema, model} = require('mongoose')

const productSchema = Schema({
    name:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    price:{
        type: Number,
        default: 0
    },
    state:{
        type: Boolean,
        required: true,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'categorie',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean
    }
}) 


productSchema.methods.toJSON = function() {
    const {__v, state, ...product} = this.toObject();
    return product
}

module.exports= model('Product', productSchema)