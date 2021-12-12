import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';
import { StorageStack } from '../../lib/stacks/storage-stack';

test.skip('Empty Stack', () => {
  const app = new App();
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
