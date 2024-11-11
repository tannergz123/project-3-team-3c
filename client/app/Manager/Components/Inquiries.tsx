"use client";

import { Box, Text, Heading, Select, Input, Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';

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

    // Placeholder for the actual inquiry logic.
    alert(`Inquiring for ${timeRange === "custom" ? `from ${startDate} to ${endDate}` : timeRange}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Inquiries
      </Heading>
      
      <VStack spacing={2} align="start" mb={4}>
        <Text>Top Selling Day: <strong>Placeholder Date</strong></Text>
        <Text>Worst Selling Day: <strong>Placeholder Date</strong></Text>
        <Text>Most Sold Item: <strong>Placeholder Item</strong></Text>
      </VStack>

      <Select placeholder="Select Time Window" mb={4} value={timeRange} onChange={handleTimeRangeChange}>
        <option value="last_week">Last Week</option>
        <option value="last_month">Last Month</option>
        <option value="custom">Custom Date Range</option>
      </Select>

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

      <Button colorScheme="blue" onClick={handleInquiry}>
        Apply Filter
      </Button>
    </Box>
  );
};

export default Inquiries;