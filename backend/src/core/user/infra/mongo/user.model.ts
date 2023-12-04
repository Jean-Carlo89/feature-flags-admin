import { Document, WithId } from 'mongodb';

export interface UserModel extends WithId<Document> {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
