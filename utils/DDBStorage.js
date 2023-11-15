// create bucket
import AWS from 'aws-sdk';
import awsCredentials from '../aws-credentials.json';

AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: awsCredentials.accessKeyId,
  secretAccessKey: awsCredentials.secretAccessKey
});

export const ddb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'drip-fountains'
}

    ddb.scan(params, (err, data) => {
        if (err) {
          console.error('Error scanning DynamoDB table:', err);
        } else {
          // Items retrieved successfully
          console.log('Items retrieved from DynamoDB:', data.Items);
        }
      });

