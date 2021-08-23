import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sns from '@aws-cdk/aws-sns';
import { RetentionDays } from '@aws-cdk/aws-logs';

export interface EmployeeBonusApiFunctionProps {
  deploymentArtifactsBucket: s3.IBucket;
  saveBonusTopic: sns.ITopic;
}

export class EmployeeBonusApiFunction extends cdk.Construct {
  public readonly functionArn: string;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: EmployeeBonusApiFunctionProps
  ) {
    super(scope, id);

    const artifactVersion = '0.6.0';
    const artifactKey = `employee-bonus/employee-bonus-api-${artifactVersion}.zip`;

    const employeeBonusApiFunction = new lambda.Function(this, 'WebFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromBucket(
        props.deploymentArtifactsBucket,
        artifactKey
      ),
      handler: 'build/lambda.handler',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        SAVE_EMPLOYEE_BONUS_SNS_TOPIC: props.saveBonusTopic.topicArn,
      },
      logRetention: RetentionDays.ONE_DAY,
    });
    this.functionArn = employeeBonusApiFunction.functionArn;

    cdk.Tags.of(employeeBonusApiFunction).add(
      'Name',
      'EmployeeBonusWebFunction'
    );
    cdk.Tags.of(employeeBonusApiFunction).add('Version', artifactVersion);

    props.saveBonusTopic.grantPublish(employeeBonusApiFunction);
  }
}
