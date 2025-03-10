export const getWeather = function () {
    const city = '101121702';
    const apiKey = "db42298355834018b30d2dfd6747f0d4";
    const url = `https://devapi.qweather.com/v7/weather/3d?location=${city}&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json());
}
export const getWeatherNow = function () {
    const city = '101121702';
    const apiKey = "db42298355834018b30d2dfd6747f0d4";
    const url = `https://devapi.qweather.com/v7/weather/now?location=${city}&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
}