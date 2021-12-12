import {
  aws_lambda as lambda,
  aws_s3 as s3,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EmployeeBonusApiFunction } from '../constructs/employee-bonus/employee-bonus-api-function';
import { EmployeeBonusIntegration } from '../constructs/employee-bonus/employee-bonus-integration';

export interface EmployeeBonusStackProps extends StackProps {
  deploymentArtifactsBucket: s3.IBucket;
}

export class EmployeeBonusStack extends Stack {
  public readonly employeeBonusApiFunction: lambda.IFunction;

  constructor(scope: Construct, id: string, props: EmployeeBonusStackProps) {
    super(scope, id, props);

    const employeeBonusIntegration = new EmployeeBonusIntegration(
      this,
      'EmployeeBonusIntegration'
    );
    this.employeeBonusApiFunction = new EmployeeBonusApiFunction(
      this,
      'EmployeeBonusApi',
      {
        deploymentArtifactsBucket: props.deploymentArtifactsBucket,
        saveBonusTopic: employeeBonusIntegration.saveBonusTopic,
      }
    ).apiFunction;
  }
}
