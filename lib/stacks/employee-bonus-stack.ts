import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lamdbda from '@aws-cdk/aws-lambda';
import { EmployeeBonusApi } from '../constructs/employee-bonus/employee-bonus-api';
import { EmployeeBonusIntegration } from '../constructs/employee-bonus/employee-bonus-integration';

export interface EmployeeBonusStackProps extends cdk.StackProps {
  deploymentArtifactsBucket: s3.IBucket;
}

export class EmployeeBonusStack extends cdk.Stack {
  public readonly employeeBonusApiFunction: lamdbda.IFunction;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: EmployeeBonusStackProps
  ) {
    super(scope, id, props);

    const employeeBonusIntegration = new EmployeeBonusIntegration(
      this,
      'EmployeeBonusIntegration'
    );

    this.employeeBonusApiFunction = new EmployeeBonusApi(
      this,
      'EmployeeBonusApi',
      {
        deploymentArtifactsBucket: props.deploymentArtifactsBucket,
        saveBonusTopic: employeeBonusIntegration.saveBonusTopic,
      }
    ).employeeBonusApiFunction;
  }
}
