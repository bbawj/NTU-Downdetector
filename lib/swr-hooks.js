import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useHalls() {
  const { data, error } = useSWR("/api/get-halls", fetcher);

  return {
    halls: data,
    isHallLoading: !error && !data,
    isError: error,
  };
}

export function useReports() {
  const { data, error } = useSWR("/api/get-reports", fetcher);

  return {
    reports: data,
    isLoading: !error && !data,
    isError: error,
  };
}
