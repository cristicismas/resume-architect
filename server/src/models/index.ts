import * as mongoose from 'mongoose';

export default () => {
  mongoose.connect(process.env.DATABASE_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};
