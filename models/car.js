import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://abeldbase:wxcp50hDcEY85oVh@it122dbaseproject.f4z9kqj.mongodb.net/?retryWrites=true&w=majority&appName=it122dbaseproject";

mongoose.connect(connectionString, {
    dbName: 'sample_mflix',
   
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carSchema = new Schema({
 brand: { type: String, required: true },
 model: String,
 year: String,
 color: String
});

export const Car = mongoose.model('Car', carSchema ,"it122_cars");