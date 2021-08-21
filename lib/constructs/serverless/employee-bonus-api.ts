import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';

export interface EmployeeBonusApiProps {
  deploymentArtifactsBucket: s3.IBucket;
}

export class EmployeeBonusApi extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: EmployeeBonusApiProps) {
    super(scope, id);

    new lambda.Function(this, 'EmployeeBonusApi', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromBucket(
        props.deploymentArtifactsBucket,
        'employee-bonus/employee-bonus-api-0.1.0.zip'
      ),
      handler: 'build/lambda.handler',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
    });
  }
}
