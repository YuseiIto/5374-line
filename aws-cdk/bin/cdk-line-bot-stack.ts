#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkLineBotStack } from '../lib/cdk-line-bot-stack';
import dotenv from 'dotenv';
const app = new cdk.App();
dotenv.config();

const POSTFIX = process.env.POSTFIX || '';
new CdkLineBotStack(app, `CdkLineBotStack${POSTFIX}`);
