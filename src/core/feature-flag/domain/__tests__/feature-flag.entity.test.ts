import { ValidationError } from '../../../shared/domain/errors/ValidationError';
import { FeatureFlag, FeatureFlagProps } from '../FeatureFlag.entity';

describe('Feature Flag unit tests', () => {
  describe('Create', () => {
    it('should be invalid if wrong information is passed', async () => {
      let arrange = [
        {
          input: {},

          expected: {
            error_message: 'name: Name is required;',
          },
        },

        {
          input: {
            is_active: false,
          },

          expected: {
            error_message: 'name: Name is required;',
          },
        },
      ];

      for (let i = 0; i < arrange.length; i++) {
        let current = arrange[i];
        await expect(async () => {
          await FeatureFlag.create(current.input as any);
        }).rejects.toThrowError(current.expected.error_message);
      }
    });

    it('Should disable a Feature flag', () => {
      const props: FeatureFlagProps = {
        name: 'test',

        is_active: true,
      };

      const flag = FeatureFlag.create(props);

      expect(flag.is_active).toBe(true);

      flag.deactivate();

      expect(flag.is_active).toBe(false);
    });

    it('Should activate a Feature flag', () => {
      const props: FeatureFlagProps = {
        name: 'test',

        is_active: false,
      };

      const flag = FeatureFlag.create(props);
      expect(flag.is_active).toBe(false);

      flag.activate();
      expect(flag.is_active).toBe(true);
    });

    it('Should change name', () => {
      const props: FeatureFlagProps = {
        name: 'test',

        is_active: false,
      };

      const flag = FeatureFlag.create(props);
      expect(flag.name).toStrictEqual('test');

      flag.change_name('testing');
      expect(flag.name).toStrictEqual('testing');
    });

    it('Should change description', () => {
      const props: FeatureFlagProps = {
        description: 'test-desc',
        name: 'test',

        is_active: false,
      };

      const flag = FeatureFlag.create(props);
      expect(flag.description).toStrictEqual('test-desc');

      flag.change_description('testing-desc');
      expect(flag.description).toStrictEqual('testing-desc');
    });
  });
});
