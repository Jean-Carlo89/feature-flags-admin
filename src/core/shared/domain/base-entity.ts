import { Uuid } from './uuid';

export type BaseEntityProps = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export abstract class BaseEntity {
  private _id: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props?: BaseEntityProps) {
    this._id = props?.id || Uuid.generate_uuidv4();
    this._created_at = props?.created_at || new Date();
    this._updated_at = props?.updated_at || new Date();
  }

  get id(): string {
    return this._id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set updated_at(updated_at: Date) {
    this._updated_at = updated_at;
  }

  abstract toJSON();
}
