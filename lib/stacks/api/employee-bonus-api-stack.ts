import { Construct } from 'constructs';
import {
  aws_apigateway as apigw,
  aws_lambda as lambda,
  NestedStack,
} from 'aws-cdk-lib';
import { ResourceNestedStackProps } from './api-gateway-stack';

export interface EmployeeBonusApiStackProps extends ResourceNestedStackProps {
  apiFunction: lambda.IFunction;
}

export class EmployeeBonusApiStack extends NestedStack {
  constructor(scope: Construct, props: EmployeeBonusApiStackProps) {
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
