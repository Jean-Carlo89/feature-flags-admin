import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { BaseEntity } from '../../domain/base-entity';
import { IRepository } from './repository-interface';

export abstract class InMemoryRepository<E extends BaseEntity>
  implements IRepository<E>
{
  async insertMany(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  items: E[] = [];

  abstract getEntity(): new (...args: any[]) => E;
  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async find(id: string): Promise<E> {
    const _id = `${id}`;
    return await this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex(
      (i) => i.id === entity.id || i[`_id`] === entity.id,
    );
    this.items[indexFound] = entity;
  }
  async delete(id: string): Promise<void> {
    const _id = `${id}`;
    // const result = await this._get(_id);
    const indexFound = this.items.findIndex(
      (i) => i.id === _id || i[`_id`] === _id,
    );

    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`;

    const item = this.items.find(
      (item) => item.id === _id || item?.[`_id`] === _id,
    );

    if (!item) {
      throw new NotFoundError(_id, this.getEntity());
      //return null;
    }

    return item;
  }
}
