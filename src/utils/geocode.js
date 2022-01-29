const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWdvcHJvIiwiYSI6ImNreWwweXk2cjI4bWYzM3FoNzV4MzN5aXcifQ.lsTXd-yoRVcg8MfYWa5RbA&limit=1'
    
    request({url, json:true}, (error,{body}={}) => {
        if(error){
            callback('Unable to connect to location services!')
        } else if (body.features.length < 1){
            callback('Unable to find location')
        } else{
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode