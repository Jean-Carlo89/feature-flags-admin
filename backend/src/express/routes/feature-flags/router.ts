import { verify_header_token_middleware } from '../../../core/shared/middleware/verify_token_middleware';
import { CreateFeatureFlagUseCase } from '../../../core/feature-flag/application/create-feature-flag/create-flag.use-case';
import { DeleteFeatureFlagUseCase } from '../../../core/feature-flag/application/delete-flag/delete-flag.use-case';
import { GetFeatureFlagUseCase } from '../../../core/feature-flag/application/get-flag-use-case/get-flag.use-case';
import { ListFeatureFlagsUseCase } from '../../../core/feature-flag/application/list-flags/list-flags.use-case';
import { UpdateFeatureFlagUseCase } from '../../../core/feature-flag/application/update-feature-flag/update-flag.use-case';
import { FeatureFlag } from '../../../core/feature-flag/domain/FeatureFlag.entity';
import { FeatureFlagFakeFactory } from '../../../core/feature-flag/domain/FeatureFlagFakeFactory';
import { FeatureFlagMongoRepository } from '../../../core/feature-flag/infra/mongo/feature-flag-mongo.repository';
import { Router } from 'express';

const feature_flags_router = Router();

feature_flags_router.post(
  '/',

  async (req, res, next) => {
    try {
      //**** Sanitize input */

      const input_data = JSON.parse(req.body);

      const input = { ...input_data };
      const repo = new FeatureFlagMongoRepository();
      const useCase = new CreateFeatureFlagUseCase(repo);

      await useCase.execute(input);

      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  },
);

feature_flags_router.post('/many', async (req, res, next) => {
  try {
    //const total = parseFloat(req.query.total as any);

    let flags = [];
    for (let i = 0; i < 100; i++) {
      const props = FeatureFlagFakeFactory.Fake({
        name: `numero : ${i + 1}`,
      } as any);

      const flag = new FeatureFlag(props);

      flags.push(flag);
    }

    const repo = new FeatureFlagMongoRepository();

    await repo.insertMany(flags);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

feature_flags_router.get(
  '/search',

  async (req, res, next) => {
    try {
      // //**** Sanitize input */

      const q = req.query.q;

      if (typeof q != 'string') {
        return res.status(404).send('query must be a string');
      }

      const repo = new FeatureFlagMongoRepository();
      // const result = await repo.find_string(new_query, 'FeatureFlags');

      const result = await repo.find_string(q as any, 'FeatureFlags');

      return res.status(200).send(result);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
);

feature_flags_router.get(
  '/state-search',

  verify_header_token_middleware,
  async (req, res, next) => {
    try {
      // //**** Sanitize input */

      const q = req.query.q;

      if (typeof q != 'string') {
        return res.status(404).send('query must be a string');
      }

      const repo = new FeatureFlagMongoRepository();

      const result = await repo.find_string(q as any, 'FeatureFlags');

      const filtered_result = result.map((item) => {
        return item.is_active;
      });

      return res.status(200).send(filtered_result);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
);

feature_flags_router.get(
  '/state/:id',

  async (req, res, next) => {
    try {
      // //**** Sanitize input */

      const input = { id: req.params.id };
      const repo = new FeatureFlagMongoRepository();
      const useCase = new GetFeatureFlagUseCase(repo);

      const result = await useCase.execute(input);

      return res.status(200).send(result.is_active);
    } catch (error) {
      next(error);
    }
  },
);

//

feature_flags_router.get('/:id', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { id: req.params.id };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new GetFeatureFlagUseCase(repo);

    const result = await useCase.execute(input);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

feature_flags_router.patch(
  '/:id',

  async (req, res, next) => {
    try {
      //**** Sanitize input */
      const id = req.params.id;

      const input_data = JSON.parse(req.body);

      const input = { id, ...input_data };
      const repo = new FeatureFlagMongoRepository();
      const useCase = new UpdateFeatureFlagUseCase(repo);

      
      const result = await useCase.execute(input);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
);

feature_flags_router.get('/', async (req, res, next) => {
  try {
    let input = { per_page: req.query.per_page, index: req.query.index };

    // Extract and sanitize input from req.query
    const perPage = parseFloat(req.query.per_page as any);
    const index = parseFloat(req.query.index as any);

    // Check if perPage and index are valid numbers (including string numbers)
    if (!isNumeric(perPage)) {
      delete input.per_page;
    }

    if (!isNumeric(index)) {
      delete input.index;
    }

    // Create the input object with the rounded values (if they are numbers)
    input = {
      per_page: isNumeric(perPage) ? Math.round(perPage) : (undefined as any),
      index: isNumeric(index) ? Math.round(index) : (undefined as any),
    };

    const repo = new FeatureFlagMongoRepository();
    const useCase = new ListFeatureFlagsUseCase(repo);

    const result = await useCase.execute(input as any);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

feature_flags_router.delete('/:id', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { id: req.params.id };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new DeleteFeatureFlagUseCase(repo);

    await useCase.execute(input);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

export { feature_flags_router };
