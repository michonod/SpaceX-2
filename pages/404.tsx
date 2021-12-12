import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/missions");
    }, 8000);
  }, [router]);

  return (
    <div className="errorPage">
      <h1>404</h1>
      <h2>Not Found</h2>
      <h3>
        The resource requested could not be found on this server! You will be
        redirected to all past missions page!
      </h3>
    </div>
  );
};

export default Custom404;
