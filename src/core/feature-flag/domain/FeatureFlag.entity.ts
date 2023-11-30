import { BaseEntity } from '../../shared/domain/base-entity';
import { Uuid } from '../../shared/domain/uuid';

import { FeatureFlagValidatorFactory } from './feature-flag.validator';

console.log('online');

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

  constructor(props: FeatureFlagProps) {
    super();

    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active;

    this.validate();
  }

  static create(props: FeatureFlagProps) {
    const feature_flag = new FeatureFlag(props);

    return feature_flag;
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
