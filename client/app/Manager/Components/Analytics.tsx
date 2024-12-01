"use client";

import {
  Box,
  Text,
  Heading,
  Select,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    if (event.target.value !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  const handleFilterApply = () => {
    if (timeRange === "custom" && (!startDate || !endDate)) {
      alert("Please enter both start and end dates for the custom date range.");
      return;
    }

    alert(
      `Filter applied for ${
        timeRange === "custom"
          ? `from ${startDate} to ${endDate}`
          : timeRange
      }`
    );
  };

  return (
    <Box height="700px" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Analytics
      </Heading>
      <Text mb={2}>Sales Data</Text>
      <Box h="150px" bgGradient="linear(to-r, purple.500, purple.300)" borderRadius="md" mb={4} />
      <Text mb={2}>Total Revenue</Text>
      <Box h="150px" bgGradient="linear(to-r, blue.500, blue.300)" borderRadius="md" mb={8} />

      {/* Time Window Dropdown */}
      <Box mb={4}>
        <Select
          placeholder="Select Time Window"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="last_week">Last Week</option>
          <option value="last_month">Last Month</option>
          <option value="custom">Custom Date Range</option>
        </Select>
      </Box>

      {/* Custom Date Range Inputs */}
      {timeRange === "custom" && (
        <VStack spacing={3} align="stretch" mb={4}>
          <Input
            placeholder="Start Date (YYYY-MM-DD)"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            placeholder="End Date (YYYY-MM-DD)"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </VStack>
      )}

      {/* Apply Filter Button */}
      <Box>
        <Button colorScheme="blue" onClick={handleFilterApply} width="100%">
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
};

export default Analytics;