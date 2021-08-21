import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class StorageStack extends cdk.Stack {
  public deploymentArtifactsBucket: s3.IBucket;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.deploymentArtifactsBucket = new s3.Bucket(
      this,
      'DeploymentArtifactsBucket',
      {
        encryption: s3.BucketEncryption.S3_MANAGED,
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    cdk.Tags.of(this.deploymentArtifactsBucket).add(
      'Name',
      'DeploymentArtifactsBucket'
    );
  }
}
