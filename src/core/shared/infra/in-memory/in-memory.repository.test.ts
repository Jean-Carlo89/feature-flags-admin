import { BaseEntity, BaseEntityProps } from '../../domain/base-entity';
import { InMemoryRepository } from './in-memory.repository';
import { NotFoundError } from '../../domain/errors/NotFoundError';

let StubEntityProps: BaseEntityProps = {
  id: 'string',
  //   created_at: new Date(),
  //   updated_at: new Date(),
};

class StubEntity extends BaseEntity {
  toJSON() {
    throw new Error('Method not implemented.');
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
describe('In Memory Repository unit tests', () => {
  let fake_repo: StubInMemoryRepository;

  beforeEach(() => {
    fake_repo = new StubInMemoryRepository();
  });

  it('Should insert entity', async () => {
    expect(fake_repo.items).toHaveLength(0);

    let StubEntityProps2: BaseEntityProps = {
      id: 'string33',
      //   created_at: new Date(),
      //   updated_at: new Date(),
    };

    let StubEntityProps3: BaseEntityProps = {
      id: 'string44',
      //   created_at: new Date(),
      //   updated_at: new Date(),
    };

    const date = new Date();

    const arrange = [StubEntityProps, StubEntityProps2, StubEntityProps3];

    const entities = arrange.map((item) => {
      const entity = new StubEntity(item);

      return entity;
    });

    await fake_repo.insertMany(entities);
    expect(fake_repo.items).toHaveLength(3);
  });

  it('Should insert many entities', async () => {
    expect(fake_repo.items).toHaveLength(0);

    const date = new Date();

    //  (StubEntityProps.created_at = date), (StubEntityProps.updated_at = date);
    const entity = new StubEntity(StubEntityProps);
    await fake_repo.insert(entity);

    expect(fake_repo.items).toHaveLength(1);
    expect(fake_repo.items[0]).toBe(entity);
  });

  it('Should throw error when entity not found', async () => {
    const x = new NotFoundError('fake id', StubEntity);

    await expect(async () => {
      const result = await fake_repo.find('fake id');

      console.log(result);
    }).rejects.toThrow(new NotFoundError('fake id', StubEntity));
  });

  it('Should find entity by id', async () => {
    StubEntityProps = {};

    const entity = new StubEntity(StubEntityProps);

    await fake_repo.insert(entity);

    let entityFound = await fake_repo.find(entity.id);

    expect(entity).toStrictEqual(entityFound);

    entityFound = await fake_repo.find(entity.id);

    expect(entity).toStrictEqual(entityFound);
  });

  it('Should return all entities', async () => {
    StubEntityProps = {};

    const entity = new StubEntity(StubEntityProps);

    await fake_repo.insert(entity);

    const entities = await fake_repo.findAll();

    expect(entities[0]).toStrictEqual(entity);
  });

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity(StubEntityProps);

    await expect(async () => {
      await fake_repo.update(entity);
    }).rejects.toThrow();
  });

  it('Should update ', async () => {
    StubEntityProps = {};

    const entity = new StubEntity(StubEntityProps);
    await fake_repo.insert(entity);

    const UpdatedStubEntityProps: BaseEntityProps = {
      id: entity.id,
      created_at: new Date('1997/04/18'),
    };

    const entity_updated = new StubEntity(UpdatedStubEntityProps);

    await fake_repo.update(entity_updated);

    expect(entity_updated).toStrictEqual(fake_repo.items[0]);
  });

  it('Should delete an entity', async () => {
    const entity = new StubEntity();
    await fake_repo.insert(entity);

    expect(fake_repo.items).toHaveLength(1);
    await fake_repo.delete(entity.id);
    expect(fake_repo.items).toHaveLength(0);
  });
});

// });
