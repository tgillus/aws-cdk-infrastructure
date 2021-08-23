import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { EmployeeBonusApiStack } from './employee-bonus-api-stack';

export interface ResourceNestedStackProps extends cdk.NestedStackProps {
  readonly restApiId: string;
  readonly rootResourceId: string;
  readonly employeeBonusApiFunctionArn: string;
  readonly compensationResourceId: string;
}

export interface ApiGatewayStackProps extends cdk.StackProps {
  employeeBonusApiFunctionArn: string;
}

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, 'RestApi', {
      deployOptions: {
        stageName: 'v1',
      },
    });
    api.root.addMethod('ANY');

    const compensation = api.root.addResource('compensation');

    new EmployeeBonusApiStack(this, {
      restApiId: api.restApiId,
      rootResourceId: api.restApiRootResourceId,
      employeeBonusApiFunctionArn: props.employeeBonusApiFunctionArn,
      compensationResourceId: compensation.resourceId,
    });
  }
}
