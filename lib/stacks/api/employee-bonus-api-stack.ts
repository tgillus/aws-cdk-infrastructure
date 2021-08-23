import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import { ResourceNestedStackProps } from './api-gateway-stack';

export class EmployeeBonusApiStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, props: ResourceNestedStackProps) {
    super(scope, 'EmployeeBonusRestApi', props);

    const api = apigw.RestApi.fromRestApiAttributes(this, 'RestApi', {
      restApiId: props.restApiId,
      rootResourceId: props.rootResourceId,
    });

    const employeeBonusApiFunction = lambda.Function.fromFunctionAttributes(
      this,
      'EmployeeBonusApitFunction',
      {
        functionArn: props.employeeBonusApiFunctionArn,
        sameEnvironment: true,
      }
    );
    employeeBonusApiFunction.addPermission('Invoke', {
      principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      sourceArn: api.arnForExecuteApi(),
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
      .addMethod('GET', new apigw.LambdaIntegration(employeeBonusApiFunction));
    compensation.addResource('messages').addProxy({
      defaultIntegration: new apigw.LambdaIntegration(employeeBonusApiFunction),
    });
  }
}
