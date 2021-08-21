import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { EmployeeBonusApi } from '../constructs/serverless/employee-bonus-api';

export interface ServerlessStackProps extends cdk.StackProps {
  deploymentArtifactsBucket: s3.IBucket;
}

export class ServerlessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ServerlessStackProps) {
    super(scope, id, props);

    new EmployeeBonusApi(this, 'EmployeeBonusApi', {
      deploymentArtifactsBucket: props.deploymentArtifactsBucket,
    });
  }
}
