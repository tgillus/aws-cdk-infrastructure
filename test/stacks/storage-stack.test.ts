import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { StorageStack } from '../../lib/stacks/storage-stack';

test.skip('Empty Stack', () => {
  const app = new cdk.App();
  const stack = new StorageStack(app, 'StorageStack');

  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
