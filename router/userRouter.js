const { getCurrentWeather, getWeather } = require("../controller/userController")

const router = require(`express`).Router()

router.post(`/newuser`,getCurrentWeather)
router.get(`/weatherupdate`,getWeather)

module.exports = router