/**Creating and Connecting a MongoDB Memory Server */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const port = 27017;

/** Creating a MongoDb Memory Saver */
const mongod = new MongoMemoryServer({
  instance: {
    port,
  },
  autoStart: false,
});
/** Connecting to a mock MongoDB sever */
const setup = async () => {
  await mongod.start();
  if (mongod.instanceInfoSync.port !== port) {
    throw new Error(`Failed to startup, :${port} already in use`);
  }
  await mongoose.connect(`mongodb://localhost/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

before(async () => {
  await setup();
});