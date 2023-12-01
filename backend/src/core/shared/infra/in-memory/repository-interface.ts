export interface IRepository<E> {
  insert(entity: E): Promise<void>;
  insertMany(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: string): Promise<void>;

  find(entity_id: string): Promise<E | null>;
  findAll(per_page?: number, index?: number): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}
