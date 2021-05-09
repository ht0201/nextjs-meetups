import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetUpPage() {
  const router = useRouter();

  async function addMeetUpHandler(enterMeetUpData) {
    console.log(enterMeetUpData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
    </Fragment>
  );
}

export default NewMeetUpPage;
