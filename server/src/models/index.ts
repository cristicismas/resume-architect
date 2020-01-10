import * as mongoose from 'mongoose';

const connectToDatabase = async () => {
  mongoose.connect(process.env.DATABASE_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

export default connectToDatabase;