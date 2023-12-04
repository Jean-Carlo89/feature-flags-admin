import { BaseEntity } from '../..//shared/domain/base-entity';
import { UserFakeFactory } from './UserFakeFactory';

export type UserProps = {
  id?: string;
  email: string;
  name: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};
export class User extends BaseEntity {
  email: string;
  password: string | null;
  name: string;

  constructor(props: UserProps) {
    super({ ...props });

    this.email = props?.email;
    this.name = props.name;
    this.password = props?.password ?? null;

    //this.validate();
  }

  static create(props: UserProps) {
    const feature_flag = new User(props);

    return feature_flag;
  }

  static fake(props?: UserProps) {
    return UserFakeFactory.Fake(props);
  }

  //   validate() {
  //     const validator = FeatureFlagValidatorFactory.create();
  //     return validator.validate(this);
  //   }

  change_password(new_password: string): void {
    this.password = new_password;
    //this.validate();
  }

  change_email(new_email: string) {
    this.email = new_email;
    //this.validate();
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,

      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
