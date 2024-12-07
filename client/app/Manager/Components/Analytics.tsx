"use client";

import {
  Box,
  Text,
  Heading,
  Select,
  Input,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Define types for the data
type SalesDataItem = {
  item_name: string;
  total_sold: number;
};

type UsageDataItem = {
  item: string;
  sum: number;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesData, setSalesData] = useState<SalesDataItem[]>([]);
  const [usageData, setUsageData] = useState<UsageDataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
    if (event.target.value !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  const fetchData = async () => {
    if (timeRange === "custom" && (!startDate || !endDate)) {
      alert("Please enter both start and end dates for the custom date range.");
      return;
    }

    // Validate date format
    const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);

    if (
      timeRange === "custom" &&
      (!isValidDate(startDate) || !isValidDate(endDate))
    ) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    // Validate range
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after the end date.");
      return;
    }

    const range =
      timeRange === "last_week"
        ? { start_date: "2024-11-24", end_date: "2024-11-30" } // Example hardcoded last week
        : timeRange === "last_month"
        ? { start_date: "2024-11-01", end_date: "2024-11-30" } // Example hardcoded last month
        : { start_date: startDate, end_date: endDate };

    console.log("Request payload:", JSON.stringify(range)); // Debug the payload

    setLoading(true);

    try {
      const salesResponse = await fetch(
        "https://project-3-team-3c.onrender.com/reports/sales-report",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(range),
        }
      );

      if (!salesResponse.ok) {
        const errorText = await salesResponse.text();
        throw new Error(`Sales report error: ${errorText}`);
      }

      const sales = await salesResponse.json();

      const usageResponse = await fetch(
        "https://project-3-team-3c.onrender.com/reports/product-usage-map",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(range),
        }
      );

      if (!usageResponse.ok) {
        const errorText = await usageResponse.text();
        throw new Error(`Product usage error: ${errorText}`);
      }

      const usage = await usageResponse.json();

      setSalesData(sales);
      setUsageData(usage);
    } catch (error) {
      alert("Failed to fetch data: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = () => {
    fetchData();
  };

  // Prepare data for sales bar chart
  const salesChartData = {
    labels: salesData.map((item) => item.item_name),
    datasets: [
      {
        label: "Total Sold",
        data: salesData.map((item) => item.total_sold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for usage bar chart
  const usageChartData = {
    labels: usageData.map((item) => item.item),
    datasets: [
      {
        label: "Usage",
        data: usageData.map((item) => item.sum),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <Box height="700px" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={10}>
        Analytics
      </Heading>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <Text mb={2}>Item Sales</Text>
          <Box h="300px" mb={4}>
            <Bar data={salesChartData} options={{ responsive: true }} />
          </Box>

          <Text mb={2}>Inventory Usage</Text>
          <Box h="300px" mb={14}>
            <Bar data={usageChartData} options={{ responsive: true }} />
          </Box>
        </>
      )}

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