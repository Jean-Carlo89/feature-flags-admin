import { MongoClient, WithId } from 'mongodb';
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

  async insert_single(collection_name: string, document: Object) {
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
}

export { MongoRepository };
