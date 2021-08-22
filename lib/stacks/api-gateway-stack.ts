import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, 'ApiGateway', {
      deployOptions: {
        stageName: 'v1',
      },
    });
    api.root.addMethod('ANY');
  }
}
