import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lamdbda from '@aws-cdk/aws-lambda';

export interface LambdaRestApiProps {
  assetDir: string;
  handler: string;
}

export class LambdaRestApiApp extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: LambdaRestApiProps) {
    super(scope, id);

    const newLambda = new lamdbda.Function(this, 'LambdaFunction', {
      runtime: lamdbda.Runtime.NODEJS_14_X,
      code: lamdbda.Code.fromAsset(props.assetDir),
      handler: props.handler,
    });

    new apigw.LambdaRestApi(this, 'LambdaRestApi', {
      handler: newLambda,
    });
  }
}
