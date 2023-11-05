import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_MONGO_URI as string;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
