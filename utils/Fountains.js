export function getFountains(location){
    dummyData = [
        {
            latitude: location.coords.latitude + 0.06,
            longitude: location.coords.longitude + 0.03,
        },
        {
            latitude: location.coords.latitude + 0.03,
            longitude: location.coords.longitude + 0.02,
        },
        {
            latitude: location.coords.latitude + 0.02,
            longitude: location.coords.longitude + 0.01,
        },
    ]
    return dummyData;
}