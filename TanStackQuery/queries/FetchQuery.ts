'use client'


import { useQueryClient } from '@tanstack/react-query';
import CheckEmailExists from './CheckEmailExists';

export const useFetchEmailExists = () => {
  const queryClient = useQueryClient();

  const fetchEmailExists = async (value: string) => {
    try {
      const userExists = await queryClient.fetchQuery({
        queryKey: ["check-email", value],
        queryFn: () => CheckEmailExists(value),
        staleTime: 1000 * 60 * 5,
      });
      return userExists;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return fetchEmailExists;
};
