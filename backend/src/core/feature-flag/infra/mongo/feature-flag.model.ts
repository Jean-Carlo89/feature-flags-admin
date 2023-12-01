import { Document, WithId } from 'mongodb';

export interface FeatureFlagModel extends WithId<Document> {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
