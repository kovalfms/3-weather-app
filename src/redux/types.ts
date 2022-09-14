export type Weather = {
    name: string,
    weather: [{
        main: string
    }],
    main: {
        temp: number,
        humidity: number,
        pressure: number
    },
    wind: {
        speed: number,
    }
    visibility: number,
    coord: {
        lon: number,
        lat: number
    }
}

export type Forecast = {
    dt: string,
    temp: {
        min: number,
        max: number,
    },
    weather: [{
        icon: string,
    }],
    wind_speed: number,
    humidity: number,
    pressure: number,
}

export type City = {
    id: string,
    name: string,
    lon: number,
    lat: number,
}