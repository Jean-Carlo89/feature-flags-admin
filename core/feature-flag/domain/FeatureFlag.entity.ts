console.log("online");

export type FeatureFlagProps = {
  id?: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
};
export class FeatureFlag {
  id: string;

  name: string;
  description: string | null;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;

  constructor(props: FeatureFlagProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at;
  }

  static create(props: FeatureFlagProps) {
    const feature_flag = new FeatureFlag(props);

    return feature_flag;
  }

  change_description(new_description: string): void {
    this.description = new_description;
  }

  change_name(new_name: string) {
    this.name = new_name;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
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
