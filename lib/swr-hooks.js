import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useHalls() {
  const { data, error } = useSWR("/api/get-halls", fetcher);

  return {
    halls: data,
    isHallLoading: !error && !data,
    isHallError: error,
  };
}

export function useReports() {
  const { data, error } = useSWR("/api/get-reports", fetcher);

  return {
    reports: data,
    isReportLoading: !error && !data,
    isReportError: error,
  };
}
