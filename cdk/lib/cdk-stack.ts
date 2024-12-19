import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from "path";
import {Architecture, DockerImageCode, DockerImageFunction} from "aws-cdk-lib/aws-lambda";
import {Duration, Size} from "aws-cdk-lib";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appName = "python-poetry-test";
    const functionName = `${appName}-lambda`;
    const fn = new DockerImageFunction(this, functionName, {
      functionName: functionName,
      architecture: Architecture.ARM_64,
      code: DockerImageCode.fromImageAsset(path.join(__dirname, '../../'), {
        cmd: ["main.handler"]
      }),
      timeout: Duration.minutes(15),
      memorySize: 2048,
      environment: {
        // env here
      }
    });
  }
}
