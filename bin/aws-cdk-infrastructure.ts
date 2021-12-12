#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/stacks/networking-stack';
import { StorageStack } from '../lib/stacks/storage-stack';
import { EmployeeBonusStack } from '../lib/stacks/employee-bonus-stack';
import { ApiGatewayStack } from '../lib/stacks/api/api-gateway-stack';

const app = new App();
new NetworkingStack(app, 'NetworkingStack');
const { deploymentArtifactsBucket } = new StorageStack(app, 'StorageStack');
const { employeeBonusApiFunction } = new EmployeeBonusStack(
  app,
  'EmployeeBonusStack',
  {
    deploymentArtifactsBucket,
  }
);
new ApiGatewayStack(app, 'ApiGatewayStack', {
  employeeBonusApiFunction,
});
