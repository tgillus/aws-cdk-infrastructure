import {
  aws_sns as sns,
  aws_sqs as sqs,
  aws_sns_subscriptions as subs,
  Duration,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class EmployeeBonusIntegration extends Construct {
  readonly saveBonusTopic: sns.ITopic;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const saveBonusQueue = new sqs.Queue(this, 'SaveBonusQueue', {
      retentionPeriod: Duration.days(1),
    });

    this.saveBonusTopic = new sns.Topic(this, 'SaveBonusTopic');
    this.saveBonusTopic.addSubscription(
      new subs.SqsSubscription(saveBonusQueue, {
        rawMessageDelivery: true,
      })
    );
  }
}
