import React from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Mission = (props: { data: any[]; launch_date_utc: number }) => {
  const router = useRouter();
  const rocketI: number = parseInt(router.query.rocketId as string);

  const date = props.data[rocketI].launch_date_utc
    ? props.data[rocketI].launch_date_utc
    : "";
  const details = props.data[rocketI].details
    ? props.data[rocketI].details
    : "No details avaliable";
  const launchSuccess = props.data[rocketI].launch_success
    ? props.data[rocketI].launch_success
    : "Unknown";
  const articleLink = props.data[rocketI].links.article_link
    ? props.data[rocketI].links.article_link
    : "";
  const videoLink = props.data[rocketI].links.video_link
    ? props.data[rocketI].links.video_link
    : "";
  const wikipediaLink = props.data[rocketI].links.wikipedia
    ? props.data[rocketI].links.wikipedia
    : "";
  const image = props.data[rocketI].links.flickr_images[0]
    ? props.data[rocketI].links.flickr_images[0]
    : "";
  const missionName = props.data[rocketI].mission_name
    ? props.data[rocketI].mission_name
    : "";
  const rocketName = props.data[rocketI].rocket.rocket_name
    ? props.data[rocketI].rocket.rocket_name
    : "";
  const rocketCompany = props.data[rocketI].rocket.rocket.company
    ? props.data[rocketI].rocket.rocket.company
    : "";
  const rocketMass = props.data[rocketI].rocket.rocket.mass.kg
    ? props.data[rocketI].rocket.rocket.mass.kg
    : "";
  const rocketDescription = props.data[rocketI].rocket.rocket.description
    ? props.data[rocketI].rocket.rocket.description
    : "";
  const rocketCountry = props.data[rocketI].rocket.rocket.country
    ? props.data[rocketI].rocket.rocket.country
    : "";
  const rocketType = props.data[rocketI].rocket.rocket_type
    ? props.data[rocketI].rocket.rocket_type
    : "";
  const launchSite = props.data[rocketI].launch_site.site_name_long
    ? props.data[rocketI].launch_site.site_name_long
    : "";

  //Date
  const dates = new Date(date);
  const hour =
    dates.getHours() < 10 ? "0" + dates.getHours() : dates.getHours();
  const minutes =
    dates.getMinutes() < 10 ? "0" + dates.getMinutes() : dates.getMinutes();
  const year = dates.getFullYear();

  let classSuccess = "success";
  launchSuccess ? classSuccess : (classSuccess = "failure");

  let backroundClass = "rocket__container ";
  image
    ? backroundClass
    : (backroundClass = " rocket__container rocket__container--image");
  return (
    <div className={backroundClass}>
      <img className="rocketImg" src={image} alt={rocketName} />
      <div className="rocket__container--center">
        <Button
          variant="contained"
          color="error"
          style={{ margin: "20px 0px" }}
          startIcon={<ArrowBackIcon />}
        >
          <Link href="/missions">Back</Link>
        </Button>
        <h3>
          <span className="title">Launch Time :</span> {hour} : {minutes}
        </h3>
        <h3>
          <span className="title">Launch Year : </span>
          {year}
        </h3>
        <p className="details__paragraph">{details}</p>
        <h3 className={classSuccess}>
          <span className="title">Launch :</span>
          {launchSuccess ? "Success" : "Failure"}
        </h3>
        <h1>
          <span className="title">Mission Name :</span>
          {missionName}
        </h1>
        <h3>
          <span className="title">Rocket Name :</span>
          {rocketName}
        </h3>
        <h3>
          <span className="title">Rocket Type :</span> {rocketType}
        </h3>
        <h3>
          <span className="title">Rocket Company :</span>
          {rocketCompany}
        </h3>
        <h3>
          <span className="title">Rocket County :</span> {rocketCountry}
        </h3>
        <h3>
          <span className="title">Rocket Mass :</span> {rocketMass} kg
        </h3>
        <h3>
          <span className="title">Launch Pad :</span> {launchSite}
        </h3>
        <p className="details__paragraph">
          <span className="title">Rocket Description : </span>
          {rocketDescription}
        </p>
        <div className="buttons__bottom">
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            color="secondary"
            startIcon={<AutoStoriesIcon />}
          >
            <Link href={wikipediaLink}>Wikipedia</Link>
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="success"
            startIcon={<VideoFileIcon />}
          >
            <Link href={videoLink}>Video</Link>
          </Button>
          <Button
            style={{ margin: "10px" }}
            className="button-btn"
            variant="contained"
            startIcon={<ArticleIcon />}
          >
            <Link href={articleLink}>Article</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    fallback: "blocking",
    paths: [
      {
        params: {
          rocketId: "rocketI",
        },
      },
    ],
  };
}

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

export default Mission;
