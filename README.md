# Personal Website S3 Admin

## Prerequisites 

### Ensure API Gateway is deployed 

Ensure you have deployed this API Gateway and Go Lambda function with AWS SAM.

## Setup Config

Configure `.env` file based on `example.env`

You can obtain the `VITE_USER_POOL_ID` and `VITE_USER_POOL_CLIENT_ID` from the provisioned AWS Cognito resource from the AWS SAM template

You can obtain `VITE_API_GATEWAY_ENDPOINT` from the provisioned AWS API Gateway resource from the AWS SAM template

Note: For local deployment, can set 

## Run Dev

`yarn run dev`

## Build

`yarn run build`