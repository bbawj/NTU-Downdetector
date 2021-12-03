import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useHalls() {
  const { data, error } = useSWR("/api/get-halls", fetcher);

  return {
    halls: data,
    isLoading: !error && !data,
    isError: error,
  };
}
