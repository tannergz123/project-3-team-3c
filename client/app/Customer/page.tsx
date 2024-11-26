"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchItems } from '../store/slices/itemsSlice';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import MainContent from './components/MainContent';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

export default function CustomerPage() {
  const dispatch = useAppDispatch();
  const itemsStatus = useAppSelector((state) => state.items.status);
  const itemsError = useAppSelector((state) => state.items.error);

  useEffect(() => {
    if (itemsStatus === 'idle') {
      dispatch(fetchItems());
    }
  }, [dispatch, itemsStatus]);

  if (itemsStatus === 'failed') {
    return (
      <Box textAlign="center">
        <Header />
        <Text color="red.600" mt = "10%">Failed to load items: {itemsError}</Text>
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
          </Box>
          <Box width="80%" pl={8}>
            <MainContent />
          </Box>
        </Flex>
      )}
    </Box>
  );
}
