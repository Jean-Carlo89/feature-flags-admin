import { BaseEntity } from '../../shared/domain/base-entity';
import { Uuid } from '../../shared/domain/uuid';
import { FeatureFlagFakeFactory } from './FeatureFlagFakeFactory';

import { FeatureFlagValidatorFactory } from './feature-flag.validator';

export type FeatureFlagProps = {
  id?: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
};
export class FeatureFlag extends BaseEntity {
  name: string;
  description: string | null;
  is_active: boolean;
  category_id: any;

  constructor(props: FeatureFlagProps) {
    super({ ...props });

    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active;

    this.validate();
  }

  static create(props: FeatureFlagProps) {
    const feature_flag = new FeatureFlag(props);

    return feature_flag;
  }

  static fake(props?: FeatureFlagProps) {
    return FeatureFlagFakeFactory.Fake(props);
  }

  validate() {
    const validator = FeatureFlagValidatorFactory.create();
    return validator.validate(this);
  }

  change_description(new_description: string): void {
    this.description = new_description;
    this.validate();
  }

  change_name(new_name: string) {
    this.name = new_name;
    this.validate();
  }

  activate(): void {
    this.is_active = true;
    this.validate();
  }

  deactivate() {
    this.is_active = false;
    this.validate();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
