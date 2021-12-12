import {
  aws_s3 as s3,
  RemovalPolicy,
  Stack,
  StackProps,
  Tags,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StorageStack extends Stack {
  public deploymentArtifactsBucket: s3.IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.deploymentArtifactsBucket = new s3.Bucket(
      this,
      'DeploymentArtifactsBucket',
      {
        encryption: s3.BucketEncryption.S3_MANAGED,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    Tags.of(this.deploymentArtifactsBucket).add(
      'Name',
      'DeploymentArtifactsBucket'
    );
  }
}
