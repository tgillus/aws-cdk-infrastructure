import {
  aws_lambda as lambda,
  aws_s3 as s3,
  aws_sns as sns,
  Tags,
  aws_logs as logs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface EmployeeBonusApiFunctionProps {
  deploymentArtifactsBucket: s3.IBucket;
  saveBonusTopic: sns.ITopic;
}

export class EmployeeBonusApiFunction extends Construct {
  public readonly apiFunction: lambda.IFunction;

  constructor(
    scope: Construct,
    id: string,
    props: EmployeeBonusApiFunctionProps
  ) {
    super(scope, id);

    const artifactVersion = '0.6.0';
    const artifactKey = `employee-bonus/employee-bonus-api-${artifactVersion}.zip`;

    this.apiFunction = new lambda.Function(this, 'EmployeeBonusApi', {
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
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    Tags.of(this.apiFunction).add('Name', 'EmployeeBonusWebFunction');
    Tags.of(this.apiFunction).add('Version', artifactVersion);

    props.saveBonusTopic.grantPublish(this.apiFunction);
  }
}
