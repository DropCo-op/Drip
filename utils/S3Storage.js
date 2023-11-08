// create bucket
import AWS from 'aws-sdk';
import awsCredentials from '../aws-credentials.json';
AWS.config.update({
  region: 'eu-west-3',
  accessKeyId: awsCredentials.accessKeyId,
  secretAccessKey: awsCredentials.secretAccessKey
});
export const s3 = new AWS.S3();

// upload to bucket
export async function uploadObjectToS3(bucketName, key, object) {
  const params = {
    Bucket: bucketName,
    Key: key, // The key (filename) under which the JSON object will be stored
    Body: JSON.stringify(object),
    ContentType: 'application/json', // Specify the content type as JSON
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading object:', err);
    } else {
      console.log('Object uploaded:', data.Location);
    }
  });
}

// download from bucket
export async function retrieveObjectFromS3(bucketName, key) {
  // TODO: make this work
}

