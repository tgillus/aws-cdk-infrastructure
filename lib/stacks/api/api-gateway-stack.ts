import {
  aws_apigateway as apigw,
  aws_lambda as lambda,
  NestedStackProps,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import {
  MockIntegration,
  PassthroughBehavior,
} from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { EmployeeBonusApiStack } from './employee-bonus-api-stack';

export interface ResourceNestedStackProps extends NestedStackProps {
  readonly restApiId: string;
  readonly rootResourceId: string;
  readonly compensationResourceId: string;
}

export interface ApiGatewayStackProps extends StackProps {
  employeeBonusApiFunction: lambda.IFunction;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, 'RestApi', {
      deployOptions: {
        stageName: 'v1',
      },
    });
    api.root.addMethod(
      'GET',
      new MockIntegration({
        integrationResponses: [{ statusCode: '200' }],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          'application/json': '{ "statusCode": 200 }',
        },
      }),
      { methodResponses: [{ statusCode: '200' }] }
    );

    const compensation = api.root.addResource('compensation');

    new EmployeeBonusApiStack(this, {
      restApiId: api.restApiId,
      rootResourceId: api.restApiRootResourceId,
      apiFunction: props.employeeBonusApiFunction,
      compensationResourceId: compensation.resourceId,
    });
  }
}
