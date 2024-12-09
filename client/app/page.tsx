// app/page.tsx
"use client";

import { Box, Heading, Grid, Text, Image, Flex, VStack } from "@chakra-ui/react";
import OpenWeatherMap from 'openweathermap-ts';
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const[weather, setWeather] = useState<any>(null);

  // Array of navigation items
  const navItems = [
    { title: "Cashier", path: "/CashierSignIn" },
    { title: "Customer", path: "/Customer" },
    { title: "Manager", path: "/ManagerSignIn" },
    { title: "Menu Board", path: "/MenuBoard" },
  ];

  // location and weather
  const openWeather = new OpenWeatherMap({
    apiKey: 'eb7e98e9dd3dada40113af1196ce05fc'
  });
  openWeather.setUnits('imperial');

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          console.log("User location:", { latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    console.log('attempting to get weather');
    if (location) {
      console.log('valid location for weather');
      openWeather
      .getCurrentWeatherByGeoCoordinates(location?.lat, location?.lon)
      .then((response) => {
        setWeather(response);
        console.log("weather response:", response);
      })
    }
  }, [location]);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="3xl" mb={10} fontWeight="bold">
        Landing Page
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {navItems.map((item) => (
          <Box
            key={item.title}
            as="button"
            onClick={() => router.push(item.path)}
            p={10}
            borderRadius="lg"
            boxShadow="md"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.400" }}
            textAlign="center"
            cursor="pointer"
          >
            <Text fontSize="2xl" fontWeight="semibold">
              {item.title}
            </Text>
          </Box>
        ))}
      </Grid>
      
      {weather && (
        <Box p={4} mt={10}>
          
          {/* City Name */}
          <Box textAlign="center" mb={4}>
            <Heading size="lg">
              {weather.name}, <Text as="span" fontWeight="normal">{weather.sys.country}</Text>
            </Heading>
          </Box>

          {/* Icon and Temperature */}
          <Flex alignItems="center" justifyContent="center" mb={4}>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              boxSize="50px"
              mr={2}
            />
            <Text fontSize="2xl" fontWeight="bold">
              {Math.round(weather.main.temp)}
              <Text as="sup" fontSize="lg" ml={1}>&deg;F</Text>
            </Text>
          </Flex>

          {/* Description and Wind Speed */}
          <VStack spacing={2}>
            <Text textTransform="uppercase" fontWeight="bold">
              {weather.weather[0].description}
            </Text>
            <Text>Wind Speed: {weather.wind.speed} m/s</Text>
          </VStack>
        </Box>
      )}

    </Box>
  );
}
