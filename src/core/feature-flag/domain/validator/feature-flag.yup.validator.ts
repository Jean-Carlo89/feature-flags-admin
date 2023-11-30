import { ValidationError } from '../../../shared/domain/errors/ValidationError';
import { ValidatorInterface } from '../../../shared/domain/validators/validator.interface';

import { FeatureFlag } from '../FeatureFlag.entity';
import * as yup from 'yup';

export class FeatureFlagYupValidator
  implements ValidatorInterface<FeatureFlag>
{
  validate(entity: FeatureFlag) {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          description: yup.string().optional().nullable(),
          is_active: yup.boolean().required(),
          created_at: yup.date().required(),
          updated_at: yup.date().nullable(),
        })
        .validateSync(
          {
            ...entity.toJSON(),
          },
          {
            abortEarly: false,
          },
        );
    } catch (e) {
      const errorDetails = {};

      const yupError = e as yup.ValidationError;

      if (yupError && yupError.inner && yupError.inner.length) {
        yupError.inner.forEach((err) => {
          if (!errorDetails[err.path]) {
            errorDetails[err.path] = [];
          }

          errorDetails[err.path].push(err.message);
        });
      }

      throw new ValidationError(errorDetails);

      //   errors.errors.forEach((error) => {
      //     errors_array.push({
      //       context: 'Customer',
      //       message: error,
      //     });
      //   });
    }
  }
}
