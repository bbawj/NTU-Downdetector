export async function defaultFetcher(route) {
  const res = await fetch(
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api/${route}`
      : `${process.env.productionURL}/api/${route}`
  );
  if (!res.ok) {
    return { error: true };
  }
  return await res.json();
}
