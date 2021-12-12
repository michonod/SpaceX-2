import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Card = (props: {
  dataLength: number;
  id: number;
  date: number;
  image: string;
  mission: string;
  detail: string;
}) => {
  const router = useRouter();
  const missionId = props.dataLength - +props.id;
  const rocketHandler = () => {
    router.push("missions/" + missionId);
  };
  const date = new Date(props.date);
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let year = date.getFullYear();
  return (
    <div className="card__container" onClick={rocketHandler}>
      <div className="card__container--top">
        <Image src={props.image} alt={props.mission} layout="fill" priority />
      </div>
      <div className="card__container--bottom">
        <h1 className="mission__name">{props.mission}</h1>
        <h4>
          {year} - {hour}:{minutes}
        </h4>
        {props.detail}
      </div>
    </div>
  );
};

export default Card;
