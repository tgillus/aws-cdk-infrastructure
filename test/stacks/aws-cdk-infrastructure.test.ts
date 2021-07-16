import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AwsCdkInfrastructureStack } from '../../lib/stacks/aws-cdk-infrastructure-stack';

test.skip('Empty Stack', () => {
  const app = new cdk.App();
  const stack = new AwsCdkInfrastructureStack(app, 'MyTestStack');

  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
