import mongoose from 'mongoose';

const connectToDatabase = async () => {
  mongoose.connect(process.env.DATABASE_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
};

export default connectToDatabase;
