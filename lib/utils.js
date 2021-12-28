export async function defaultFetcher(route, options) {
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
}
