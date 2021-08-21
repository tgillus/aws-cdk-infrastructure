#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NetworkingStack } from '../lib/stacks/networking-stack';
import { StorageStack } from '../lib/stacks/storage-stack';
import { ServerlessStack } from '../lib/stacks/serverless-stack';

const app = new cdk.App();
new NetworkingStack(app, 'NetworkingStack');
const { deploymentArtifactsBucket } = new StorageStack(app, 'StorageStack');
new ServerlessStack(app, 'ServerlessStack', {
  deploymentArtifactsBucket,
});
