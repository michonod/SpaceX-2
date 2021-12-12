import { Button } from "@mui/material";
import Link from "next/link";
import Head from "next/head";

const HomePage = () => {
  return (
    <div className="homePage__container">
      <h1>Welcome to Space X</h1>
      <Button size="large" variant="contained">
        <Link href="/missions">Continue</Link>
      </Button>
    </div>
  );
};

export default HomePage;
