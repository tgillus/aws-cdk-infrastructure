import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as sqs from '@aws-cdk/aws-sqs';
import * as subs from '@aws-cdk/aws-sns-subscriptions';

export class EmployeeBonusIntegration extends cdk.Construct {
  readonly saveBonusTopic: sns.ITopic;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const saveBonusQueue = new sqs.Queue(this, 'SaveBonusQueue', {
      retentionPeriod: cdk.Duration.days(1),
    });

    this.saveBonusTopic = new sns.Topic(this, 'SaveBonusTopic');
    this.saveBonusTopic.addSubscription(
      new subs.SqsSubscription(saveBonusQueue, {
        rawMessageDelivery: true,
      })
    );
  }
}
