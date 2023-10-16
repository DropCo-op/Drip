export async function uploadJsonObjectToS3(s3, key, object) {
  const params = {
    Bucket: 'drip-fountains-eu',
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

