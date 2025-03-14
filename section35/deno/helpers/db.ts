import { Database, MongoClient } from "@db/mongo";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  await client.connect(
    "mongodb+srv://carlosaraujo:mongopass@cluster0.7jhtq.mongodb.net/todos?authMechanism=SCRAM-SHA-1"
  );

  db = client.database("todos");
}

export function getDb() {
  return db;
}
