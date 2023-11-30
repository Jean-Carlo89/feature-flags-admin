import { ValidatorInterface } from '../../shared/domain/validators/validator.interface';
import Joi from 'joi';
import { FeatureFlag } from './FeatureFlag.entity';

import { FeatureFlagYupValidator } from './validator/feature-flag.yup.validator';

export class FeatureFlagValidatorFactory {
  static create(): ValidatorInterface<FeatureFlag> {
    return new FeatureFlagYupValidator();
  }
}
