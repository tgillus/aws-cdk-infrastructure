import { Construct } from 'constructs';
import { aws_ec2 as ec2, Stack, StackProps } from 'aws-cdk-lib';

export class NetworkingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ec2.Vpc(this, 'Vpc', {
      maxAzs: 1,
    });
  }
}
