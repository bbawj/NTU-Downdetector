import { useEffect } from "react";

export async function defaultFetcher(route, options) {
  try {
    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/${route}`
        : `${process.env.productionURL}/api/${route}`,
      options
    );
    if (!res.ok) {
      return { error: true };
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export function formatTimeAgo(date) {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  let duration = (new Date(date) - new Date() + 8 * 60 * 60 * 1000) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export function useOutsideAlerter(ref, setIsOpen) {
  useEffect(() => {
    //close the modal
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
