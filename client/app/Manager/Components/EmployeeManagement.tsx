import { Box, Table, Tbody, Tr, Td, Text, Heading } from '@chakra-ui/react';

const EmployeeManagement = () => {
  const employees = [
    { name: 'Adam', rate: '$15/hr' },
    { name: 'Tom', rate: '$20/hr' },
    { name: 'Jack', rate: '$30/hr' },
    { name: 'Drew', rate: '$18/hr' },
    { name: 'Bob', rate: '$21/hr' },
    { name: 'Smith', rate: '$22/hr' },
    { name: 'Mike', rate: '$18/hr' },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Employee Management
      </Heading>
      <Table variant="simple">
        <Tbody>
          {employees.map((employee, index) => (
            <Tr key={index}>
              <Td>{employee.name}</Td>
              <Td>{employee.rate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeManagement;
