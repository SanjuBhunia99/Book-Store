import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({

    name: String,
    author: String,
    price: Number,
    category: String,
    image: String,
   
})
const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;