// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

// const DUMMY_MEETUP = [
//   {
//     id: "m1",
//     title: "First",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/9/9d/Turin_at_sunset.jpg",
//     address: "address 1",
//     description: "description 1",
//   },
//   {
//     id: "m2",
//     title: "Second",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/0/0c/Sunrise_at_Bergamo_old_town%2C_Lombardy%2C_Italy.jpg",
//     address: "address 2",
//     description: "description 2",
//   },
// ];

export async function getStaticProps() {
  // fetch data from API

  // client connect db mongodb
  const client = await MongoClient.connect(
    "mongodb+srv://admin_meetup:admin@cluster0.fifrw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // chon props db
  const db = client.db();

  // tim db 'ten' ra
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default function Home(props) {
  // const [loadMeetUp, setLoadMeetUp] = useState([]);
  // useEffect(() => {
  //   setLoadMeetUp(DUMMY_MEETUP);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
