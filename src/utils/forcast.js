const request = require("request");

const forcast = (longitude, latitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=8d39142d51a8c0963b507c2c5074b1ac&query='+ latitude + ','+ longitude + '&units=f'
    request({url, json:true}, (error, {body}={}) => {
        if (error){
            callback('Unable to connect to weather service!')
        } else if(body.error){
            callback('Unable to find location')
        } else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degress out. It feels like '+body.current.feelslike+' degress out. The humidity is '+body.current.humidity+'%.')
        }
    })
}

module.exports = forcast