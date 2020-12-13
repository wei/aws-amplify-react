// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { InstanceRole } = initSchema(schema);

export {
  InstanceRole
};