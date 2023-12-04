import { MongoClient, WithId, Document } from 'mongodb';
import { Db, GridFSBucket, ObjectId } from 'mongodb';
import { get_connection } from './config';

export enum Upload_Error {
  INVALID_ARCHIVE = ' invalid archive object',
  UNABLE_TO_UPLOAD = 'unable to save archive in database',
}

export enum Download_Error {
  INVALID_ID = ' invalid ID',
  NO_ARCHIVE_FOUND = 'unable to find archive with this ID in database',
  UNABLE_TO_RECORD = 'There was an error when recording archive before download',
}

export enum Delete_Error {
  INVALID_ID = ' invalid ID',
  // NO_ARCHIVE_FOUND = "unable to find archive with this ID in database",
  // UNABLE_TO_RECORD = "There was an error when recording archive before download"
}

abstract class MongoRepository {
  private url: string;
  mdb_client: MongoClient;
  protected mdb_name: string;
  private _db: Db;
  private _archives_path_directory: string;

  constructor() {
    this.url = process.env.MDB_URI;

    this.mdb_client = get_connection();

    this.mdb_name = process.env.MDB_DB;
  }

  protected async insert_single(collection_name: string, document: Object) {
    try {
      const result = await this.mdb_client
        .db(this.mdb_name)
        .collection(collection_name)
        .insertOne(document);

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  protected async update_by_id(
    collection_name: string,
    id: string,
    fields: object,
  ) {
    try {
      const filter = { id: id };

      const result = await this.mdb_client
        .db(this.mdb_name)
        .collection(collection_name)
        .updateOne(filter, fields);

      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error updating fields');
    } finally {
    }
  }

  protected async find_all(
    collection_name: string,

    startIndex: number = 0,
    numberOfDocuments: number = 20,
  ): Promise<Document[]> {
    try {
      const pipeline = [{ $skip: startIndex }, { $limit: numberOfDocuments }];

      const collection = this.mdb_client
        .db(this.mdb_name)
        .collection(collection_name);
      const result = await collection.aggregate(pipeline).toArray();

      return result;
    } catch (e) {
      console.error(e);
      throw new Error(`An error occurred getting all documents`);
    }
  }

  public async find_string(q: RegExp, collection_name: string) {
    const result = await this.mdb_client

      .db(this.mdb_name)
      .collection(collection_name)
      .find({
        name: { $regex: new RegExp(q, 'i') },
      })
      .toArray();
    return result;
  }

  protected async insert_many(collection_name: string, documents: object[]) {
    try {
      const result = await this.mdb_client
        .db(this.mdb_name)
        .collection(collection_name)
        .insertMany(documents);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error inserting documents');
    }
  }

  protected async find_single_by_id(collectionName: string, id: string) {
    const result = await this.mdb_client
      .db(this.mdb_name)
      .collection(collectionName)
      .findOne({ id });

    return result;
  }
  protected async delete_by_id(collection: string, id: string) {
    try {
      if (id) {
        await this.mdb_client
          .db(process.env.MDB_DB)
          .collection(collection)
          .deleteOne({ id: id });
      } else {
        return Delete_Error.INVALID_ID;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { MongoRepository };
