import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import { EventType, Props, ResponseData } from "@/types/types";

export default function HomePage({ events }: any) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt: EventType) => (
        <EventItem key={evt.id + ""} evt={evt} />
      ))}

      {events.data.length > 0 && <Link href="/events">View All Events</Link>}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`);
  const events: ResponseData = await res.json();

  return {
    props: { events }
  };
}
