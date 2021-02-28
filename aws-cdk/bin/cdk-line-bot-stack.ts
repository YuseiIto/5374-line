#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkLineBotStack } from '../lib/cdk-line-bot-stack';

const app = new cdk.App();
new CdkLineBotStack(app, 'CdkLineBotStack');
