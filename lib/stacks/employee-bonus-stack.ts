import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { EmployeeBonusApi } from '../constructs/employee-bonus/employee-bonus-api';
import { EmployeeBonusIntegration } from '../constructs/employee-bonus/employee-bonus-integration';

export interface EmployeeBonusStackProps extends cdk.StackProps {
  deploymentArtifactsBucket: s3.IBucket;
}

export class EmployeeBonusStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: EmployeeBonusStackProps
  ) {
    super(scope, id, props);

    const bonusIntegration = new EmployeeBonusIntegration(
      this,
      'EmployeeBonusIntegration'
    );

    new EmployeeBonusApi(this, 'EmployeeBonusApi', {
      deploymentArtifactsBucket: props.deploymentArtifactsBucket,
      saveBonusTopic: bonusIntegration.saveBonusTopic,
    });
  }
}
