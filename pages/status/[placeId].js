import { useRouter } from "next/router";

function HallStatusPage() {
  const router = useRouter();

  return <h1>{router.query.placeId}</h1>;
}

export default HallStatusPage;
