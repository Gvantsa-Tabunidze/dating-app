'use client'


import CheckEmailExists from '@/api';
import { useQueryClient } from '@tanstack/react-query';


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
