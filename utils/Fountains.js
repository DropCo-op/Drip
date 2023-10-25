import { s3 } from "../S3Storage";

export async function getFountains(){
    dummyData = await retrieveFountainsFromS3(s3);
    window.console.log(`getFountains ${dummyData}`)
    return dummyData;
}

export async function retrieveFountainsFromS3() {
  const getParams = {
    Bucket: 'drip-fountains-eu',
    Key: 'fountains.json'
  }

  const data = s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

    // No error happened
    // Convert Body from a Buffer to a String
    const objectData = JSON.parse(data.Body.toString())["fountains"]; 
    window.console.log(objectData);
    return [...objectData];
});
  return data

}
