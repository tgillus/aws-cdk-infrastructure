import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { ResourceNestedStackProps } from './api-gateway-stack';

export interface EmployeeBonusApiStackProps extends ResourceNestedStackProps {
  apiFunction: lambda.IFunction;
}

export class EmployeeBonusApiStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, props: EmployeeBonusApiStackProps) {
    super(scope, 'EmployeeBonusApiStack', props);

    const api = apigw.RestApi.fromRestApiAttributes(this, 'RestApi', {
      restApiId: props.restApiId,
      rootResourceId: props.rootResourceId,
    });

    const compensation = apigw.Resource.fromResourceAttributes(
      this,
      'Compensation',
      {
        path: '/compensation',
        resourceId: props.compensationResourceId,
        restApi: api,
      }
    );
    compensation
      .addResource('{employeeNumber}')
      .addResource('messages')
      .addMethod('GET', new apigw.LambdaIntegration(props.apiFunction));

    const messages = compensation.addResource('messages');
    messages.addMethod('GET', new apigw.LambdaIntegration(props.apiFunction));
    messages.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(props.apiFunction),
    });
  }
}
