const weatherModel = require(`../model/userModel`)
const axios = require(`axios`)
const date = new Date()


exports.getCurrentWeather = async(req,res)=>{
    try {  
    // Get the user's location data
    const locationOptions = {
        url: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.locationKey}`,
        method: "GET"
    };
    const locationResponse = await axios.request(locationOptions);
    const locationData = locationResponse.data;
    const getWeather = async (lat, lon) => {
        try {
            const options = {
                url: `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherKey}&q=${lat},${lon}`,
                method: "GET"
            };
            const response = await axios.request(options);
            return response.data;
        } catch (e) {
            ("Error fetching weather data");
        }
    };
    //Get the weather data using the latitude and longitude from the location data
    const weatherData = await getWeather(locationData.latitude, locationData.longitude);
  
    const { Firstname, Lastname, Email} = req.body;
    const data = {
        Firstname,
        Lastname,
        Email,
        CurrentDate: date.toLocaleDateString(),
        IpAddress: locationData.ip,
        Country: locationData.country_name,
        State: locationData.state_prov,
        CurrentWeather: weatherData.current.condition.text,
        TemperatureReading: weatherData.current.temp_c,
    };
    const weatherRequest = await weatherModel.create(data)
        res.status(201).json({ message:`Dear ${data.Firstname} kindly find current weather status below`, weatherRequest});
    } catch (e) {
    res.status(500).json(e.message)
    }
}

exports.getWeather = async(req,res)=>{
    try {
        const locationOptions = {
            url: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.locationKey}`,
            method: "GET"
        };
        const locationResponse = await axios.request(locationOptions);
        const options = {
            url: `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherKey}&q=${locationResponse.data.latitude},${locationResponse.data.longitude}`,
            method: "GET"
        };
    const response = await axios.request(options)
    
    res.status(200).json(response.data)
    } catch (e) {
        res.status(500).json(e.message)
    }
}