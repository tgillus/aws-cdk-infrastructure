import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';

export interface ApiGatewayStackProps extends cdk.StackProps {
  employeeBonusApiFunction: lambda.IFunction;
}
export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, 'ApiGateway', {
      deployOptions: {
        stageName: 'v1',
      },
    });
    api.root.addMethod('ANY');

    const compensation = api.root.addResource('compensation');
    const messages = compensation.addResource('messages');

    const employeeNumber = compensation.addResource('{employeeNumber}');
    const employeeBonus = employeeNumber.addResource('messages');
    employeeBonus.addMethod(
      'GET',
      new apigw.LambdaIntegration(props.employeeBonusApiFunction)
    );

    messages.addMethod(
      'GET',
      new apigw.LambdaIntegration(props.employeeBonusApiFunction, {
        proxy: true,
      })
    );
    messages.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(
        props.employeeBonusApiFunction
      ),
    });
  }
}
