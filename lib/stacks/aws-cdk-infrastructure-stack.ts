import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { LambdaRestApiApp } from '../constructs/lambda-rest-api-app';

export class AwsCdkInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaRestApiApp(this, 'HelloLambdaRestApiApp', {
      assetDir: 'lambda',
      handler: 'hello.handler',
    });
  }
}
