import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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

export function useHalls(fallbackData) {
  const { data, error } = useSWR("/api/halls", fetcher, {
    fallbackData: fallbackData,
  });
  if (fallbackData && fallbackData.error) {
    return {
      isHallLoading: false,
      isHallError: true,
    };
  }
  return {
    halls: data,
    isHallLoading: !error && !data,
    isHallError: error,
  };
}

export function useIndividualHall({ mounted, hall_id }) {
  const { data, error } = useSWR(
    mounted && hall_id ? `/api/halls/${hall_id}` : null,
    fetcher
  );
  return {
    hall: data,
    isHallLoading: !error && !data,
    isHallError: error,
  };
}

export function useReports(fallbackData) {
  const { data, error } = useSWR("/api/reports", fetcher, {
    fallbackData: fallbackData,
  });
  if (fallbackData && fallbackData.error) {
    return {
      isReportLoading: false,
      isReportError: true,
    };
  }

  return {
    reports: data,
    isReportLoading: !error && !data,
    isReportError: error,
  };
}

export function useIndividualReports({ mounted, hall_id }) {
  const { data, error } = useSWR(
    mounted && hall_id ? `/api/reports/${hall_id}` : null,
    fetcher
  );

  return {
    reports: data,
    isReportLoading: !error && !data,
    isReportError: error,
  };
}

export function useComments({ fallbackData, hall_id }) {
  const { data, error } = useSWR(`/api/comments/${hall_id}`, fetcher, {
    fallbackData: fallbackData,
  });
  if (fallbackData && fallbackData.error) {
    return {
      isCommentLoading: false,
      isCommentError: true,
    };
  }

  return {
    comments: data,
    isCommentLoading: !error && !data,
    isCommentError: error,
  };
}

export function useInfiniteComments({ mounted, hall_id }) {
  const getKey = (pageIndex, prevData) => {
    if (prevData && !prevData.length) return null; // reached the end
    if (pageIndex === 0) return `/api/comments/${hall_id}`;
    return `/api/comments/${hall_id}?cursor=${
      prevData[prevData.length - 1].id
    }`;
  };
  const { data, error, mutate, size, setSize } = useSWRInfinite(
    mounted && hall_id ? getKey : null,
    fetcher
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  return {
    commentData: data,
    isCommentError: error,
    isCommentLoading: isLoadingMore,
    isCommentEnd: isReachingEnd,
    isNoComments: isEmpty,
    commentMutate: mutate,
    size: size,
    setSize: setSize,
  };
}

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error, mutate } = useSWR("/api/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return [error ? null : user, { mutate }];
}
