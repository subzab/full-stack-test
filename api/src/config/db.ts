import mongoose from 'mongoose'

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info('DB connected!!'))
  .catch((error: any) => console.info("can't connect to DB : ", error))

mongoose.connection.on('error', (err: any) => {
  console.error(err)
})
