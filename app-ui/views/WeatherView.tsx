import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface Weather {
  hourly_units: {
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export default function WeatherView() {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    getWeather().catch(console.error);
  }, []);

  const getWeather = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=44.43&longitude=26.11&hourly=temperature_2m');
    const data = await response.text();
    setWeather(JSON.parse(data));
  };

  const renderWeather = () => {
    return weather?.hourly.time.map((hour, index) =>
      <Box key={index} mb={2}>
        {hour}:{weather.hourly.temperature_2m[index]}{weather.hourly_units.temperature_2m}
      </Box>
    );
  };

  if (!weather)
    return null;

  return (
    <Box p={5} textAlign='center'>
      {renderWeather()}
    </Box>
  );
}