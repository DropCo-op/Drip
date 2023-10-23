export async function uploadObjectToS3(s3, bucketName, key, object) {
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

export async function retrieveObjectFromS3(s3, bucketName, key) {
  // TODO: make this work
}

