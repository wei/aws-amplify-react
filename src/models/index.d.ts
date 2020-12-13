import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class InstanceRole {
  readonly id: string;
  readonly instanceID: string;
  readonly entityID: string;
  readonly role: string;
  constructor(init: ModelInit<InstanceRole>);
  static copyOf(source: InstanceRole, mutator: (draft: MutableModel<InstanceRole>) => MutableModel<InstanceRole> | void): InstanceRole;
}