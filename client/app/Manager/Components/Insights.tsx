"use client";

import {
  Box,
  Text,
  Heading,
  Select,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Insights = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportData, setReportData] = useState(null);

  const monthToNumber = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleInquiry = async () => {
    if (!selectedMonth) {
      alert("Please select a month.");
      return;
    }

    try {
      const monthNumber = monthToNumber[selectedMonth];
      const response = await fetch(
        `https://project-3-team-3c.onrender.com/reports/insights-report?month=${monthNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch insights report.");
      }

      const data = await response.json();
      setReportData(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box height="700px" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={24}>
        Insights
      </Heading>

      {/* Statistics Section */}
      <VStack spacing={4} align="stretch" mb={40}>
        <Text>
          Top Selling Day: <strong>{reportData?.["Top selling day"] || "--"}</strong>
        </Text>
        <Text>
          Top Selling Item: <strong>{reportData?.["Top selling item for the month"] || "--"}</strong>
        </Text>
        <Text>
          Total Sales: <strong>{reportData?.["Total sales for the month"] || "--"}</strong>
        </Text>
        <Text>
          Total Sales for Top Selling Day: <strong>{reportData?.["Total sales for the top selling day"] || "--"}</strong>
        </Text>
        <Text>
          Total Sales for Worst Selling Day: <strong>{reportData?.["Total sales for the worst selling day"] || "--"}</strong>
        </Text>
        <Text>
          Worst Selling Day: <strong>{reportData?.["Worst selling day"] || "--"}</strong>
        </Text>
      </VStack>

      {/* Month Selector and Button */}
      <VStack spacing={4} align="stretch" mb={4}>
        <Select
          placeholder="Select Month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </Select>

        <Button colorScheme="blue" onClick={handleInquiry} width="100%">
          Apply Filter
        </Button>
      </VStack>
    </Box>
  );
};

export default Insights;