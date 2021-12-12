import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom500 = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 8000);
  }, [router]);

  return (
    <div className="errorPage">
      <h1>500</h1>
      <h2>Server error</h2>
      <h3>
        Oops, something went wrong! You will be redirected to all past missions
        page!
      </h3>
    </div>
  );
};

export default Custom500;
