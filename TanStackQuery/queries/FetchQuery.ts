'use client'

import { useQueryClient } from '@tanstack/react-query'
import CheckEmailExists from './CheckEmailExists'




const FetchQuery = async (value: string) => {
const query_client = useQueryClient()
  try {
    const userExists = await query_client.fetchQuery({
      queryKey: ["check-email", value],
      queryFn: () => CheckEmailExists(value),
      staleTime: 1000 * 60 * 5,
    });
    return userExists;
  } catch (err) {
    console.error(err);
    return false; // assume "doesn't exist" on network error
  }
};

export default FetchQuery;
