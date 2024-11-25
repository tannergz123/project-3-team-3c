"use client";

import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Define the Employee type
type Employee = {
  name: string;
  rate: number;
};

const EmployeeManagement = () => {
  // Explicitly define the state types
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState<{ name: string; rate: string }>(
    {
      name: "",
      rate: "",
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch employees on component mount
  useEffect(() => {
    fetch("https://project-3-team-3c.onrender.com/employees/get-employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(
          data.map((emp: any) => ({
            name: emp.employee_name,
            rate: emp.hourly_salary,
          }))
        );
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  const handleSave = (index: number) => {
    const updatedEmployee = employees[index];
    fetch("https://project-3-team-3c.onrender.com/employees/update-employees", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_name: updatedEmployee.name,
        hourly_salary: updatedEmployee.rate,
      }),
    })
      .then(() => {
        setIsEditing(null);
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleRemove = (index: number) => {
    const employeeToRemove = employees[index];
    fetch("https://project-3-team-3c.onrender.com/employees/fire-employees", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_name: employeeToRemove.name,
      }),
    })
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((_, i) => i !== index)
        );
      })
      .catch((error) => console.error("Error removing employee:", error));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.rate) {
      fetch("https://project-3-team-3c.onrender.com/employees/create-employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_name: newEmployee.name,
          hourly_salary: parseFloat(newEmployee.rate),
        }),
      })
        .then(() => {
          setEmployees((prevEmployees) => [
            ...prevEmployees,
            { name: newEmployee.name, rate: parseFloat(newEmployee.rate) },
          ]);
          setNewEmployee({ name: "", rate: "" });
          onClose();
        })
        .catch((error) => console.error("Error adding employee:", error));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp, i) =>
        i === index ? { ...emp, rate: parseFloat(value) } : emp
      )
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} maxH="470px" overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Employee Management
      </Heading>

      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        Add Employee
      </Button>

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
                    onBlur={() => handleSave(index)}
                    autoFocus
                  />
                ) : (
                  `$${employee.rate}/hr`
                )}
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleEdit(index)}
                  disabled={isEditing !== null && isEditing !== index}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleRemove(index)}
                >
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
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
            <Input
              placeholder="Wage"
              type="number"
              value={newEmployee.rate}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, rate: e.target.value })
              }
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