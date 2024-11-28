const {Schema, model} = require('mongoose')

const CategorieSchema = Schema({
    name:{
        type: String,
        required: [true, 'La Categoria es obligatoria es obligatorio'],
        unique: true 
    },
    state:{
        type: Boolean,
        default: true, 
        require: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
}) 

CategorieSchema.methods.toJSON = function() {
    const {__v, ...categorie} = this.toObject();

    return categorie
}
module.exports= model('categorie', CategorieSchema)