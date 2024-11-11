import { Box, Text, Heading } from '@chakra-ui/react';

const Analytics = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Analytics
      </Heading>
      <Text mb={2}>Sales Data</Text>
      <Box h="150px" bgGradient="linear(to-r, purple.500, purple.300)" borderRadius="md" mb={4} />
      <Text mb={2}>Total Revenue</Text>
      <Box h="150px" bgGradient="linear(to-r, blue.500, blue.300)" borderRadius="md" />
    </Box>
  );
};

export default Analytics;