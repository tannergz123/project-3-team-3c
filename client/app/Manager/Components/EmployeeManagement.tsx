"use client";

import { Box, Table, Tbody, Tr, Td, Heading, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const EmployeeManagement = () => {
  const initialEmployees = [
    { name: 'Adam', rate: 15 },
    { name: 'Tom', rate: 20 },
    { name: 'Jack', rate: 30 },
    { name: 'Drew', rate: 18 },
    { name: 'Bob', rate: 21 },
    { name: 'Smith', rate: 22 },
    { name: 'Mike', rate: 18 },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [isEditing, setIsEditing] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ name: '', rate: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  const handleRemove = (index) => {
    setEmployees((prevEmployees) => prevEmployees.filter((_, i) => i !== index));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.rate) {
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        { name: newEmployee.name, rate: parseFloat(newEmployee.rate) },
      ]);
      setNewEmployee({ name: '', rate: '' });
      onClose();
    }
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp, i) => (i === index ? { ...emp, rate: parseFloat(value) } : emp))
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} maxH="470px" overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Employee Management
      </Heading>

      <Button colorScheme="blue" mb={4} onClick={onOpen}>Add Employee</Button>

      <Table variant="simple">
        <Tbody>
          {employees.map((employee, index) => (
            <Tr key={index}>
              <Td>{employee.name}</Td>
              <Td>
                {isEditing === index ? (
                  <Input
                    type="number"
                    value={employee.rate}
                    onChange={(event) => handleInputChange(event, index)}
                    onBlur={handleSave}
                    autoFocus
                  />
                ) : (
                  `$${employee.rate}/hr`
                )}
              </Td>
              <Td>
                <Button size="sm" colorScheme="blue" onClick={() => handleEdit(index)} disabled={isEditing !== null && isEditing !== index}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleRemove(index)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              mb={3}
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <Input
              placeholder="Wage"
              type="number"
              value={newEmployee.rate}
              onChange={(e) => setNewEmployee({ ...newEmployee, rate: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEmployee}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeeManagement;