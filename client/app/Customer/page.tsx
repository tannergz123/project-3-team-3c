"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchItems } from '../store/slices/itemsSlice';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import MainContent from './components/MainContent';
import { Box, Flex, Spinner, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function CustomerPage() {
  const dispatch = useAppDispatch();
  const itemsStatus = useAppSelector((state) => state.items.status);
  const itemsError = useAppSelector((state) => state.items.error);

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI's modal control hooks

  useEffect(() => {
    if (itemsStatus === 'idle') {
      dispatch(fetchItems());
    }
  }, [dispatch, itemsStatus]);

  if (itemsStatus === 'failed') {
    return (
      <Box textAlign="center">
        <Header />
        <Text color="red.600" mt="10%">Failed to load items: {itemsError}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      {itemsStatus === 'loading' ? (
        <Box textAlign="center" mt={8}>
          <Spinner size="lg" />
          <Text mt={4}>Loading...</Text>
        </Box>
      ) : (
        <Flex mt={6} px={4}>
          <Box width="20%">
            <CategorySelector />
            <Box position="fixed" bottom="16px" left="16px" zIndex="1000">
              <IconButton
                aria-label="Info"
                icon={<InfoOutlineIcon />}
                onClick={onOpen}
                colorScheme="blue"
                variant="ghost"
              />
              Order Instructions
            </Box>
          </Box>
          <Box width="80%" pl={8}>
            <MainContent />
          </Box>
        </Flex>
      )}

      {/* Instructions Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to Place an Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" mb={2}>
              1. Select a category from the menu on the left (e.g., Entrees, Sides, Drinks, Appetizers).
            </Text>
            <Text fontSize="sm" mb={2}>
              2. Choose items within the selected category by clicking the + button.
            </Text>
            <Text fontSize="sm" mb={2}>
              3. Customize your selection (e.g., add quantities, sides, or drinks).
            </Text>
            <Text fontSize="sm" mb={2}>
              4. Click "Add to Order" to add the item(s) to your cart.
            </Text>
            <Text fontSize="sm">
              5. Find your cart on the top right to review your order and checkout when ready.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}