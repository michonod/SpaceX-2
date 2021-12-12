import React from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import noimage from "../../public/noimage.jpg";
import Card from "../../components/Card";

const Rockets: React.FC<{
  data: [
    {
      id: number;
      launch_date_utc: number;
      mission_name: string;
      links: any;
      details: any;
    }
  ];
}> = ({ data }) => {
  const dataLength = data.length;
  return (
    <div>
      <h1 className="missions__heading">All past missions</h1>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Card
              dataLength={dataLength}
              key={item.id}
              id={item.id}
              date={item.launch_date_utc}
              mission={item.mission_name}
              image={item.links.flickr_images[0] || noimage}
              detail={
                item.details ? item.details : <h3>No details avaliable</h3>
              }
            ></Card>
          </div>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: gql`
      {
        launchesPast {
          id
          launch_date_utc
          launch_site {
            site_name_long
          }
          launch_success
          launch_year
          links {
            article_link
            video_link
            flickr_images
            wikipedia
          }
          mission_name
          rocket {
            rocket {
              company
              country
              description
              mass {
                kg
              }
            }
            rocket_name
            rocket_type
          }
          details
        }
      }
    `,
  });
  return {
    props: {
      data: data.launchesPast,
    },
  };
}

export default Rockets;
