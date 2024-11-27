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

const Inquiries = () => {
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

  const handleInquiry = () => {
    if (timeRange === "custom" && (!startDate || !endDate)) {
      alert("Please enter both start and end dates for the custom date range.");
      return;
    }

    alert(
      `Inquiring for ${
        timeRange === "custom"
          ? `from ${startDate} to ${endDate}`
          : timeRange
      }`
    );
  };

  return (
    <Box
      height="700px"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
    >
      <Heading as="h2" size="md" mb={4}>
        Inquiries
      </Heading>

      {/* Statistics Section */}
      <VStack spacing={4} align="stretch">
        <Text>Top Selling Day: <strong>Placeholder Date</strong></Text>
        <Text>Worst Selling Day: <strong>Placeholder Date</strong></Text>
        <Text>Most Sold Item: <strong>Placeholder Item</strong></Text>
      </VStack>

      {/* Time Window Dropdown */}
      <Box>
        <Select
          placeholder="Select Time Window"
          value={timeRange}
          onChange={handleTimeRangeChange}
          mb={4} // Space below the dropdown
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
        <Button colorScheme="blue" onClick={handleInquiry} width="100%">
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
};

export default Inquiries;