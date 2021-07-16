#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { AwsCdkInfrastructureStack } from '../lib/aws-cdk-infrastructure-stack'

const app = new cdk.App()
new AwsCdkInfrastructureStack(app, 'AwsCdkInfrastructureStack')
