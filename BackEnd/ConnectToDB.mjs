import { MongoClient } from 'mongodb';

export const connectToMongo = async () => {
  const mongoc = new MongoClient("mongodb://127.0.0.1:27017/");
  await mongoc.connect();
  return mongoc;
};

export const getKraj = async (query) => {
  const mongoc = await connectToMongo();
  const dbo = mongoc.db("fifa");
  const f = dbo.collection("mecz").find(query);
  const result = await f.toArray();
  mongoc.close();
  return result;
};
