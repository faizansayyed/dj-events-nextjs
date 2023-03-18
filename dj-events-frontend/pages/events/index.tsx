import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import { EventType, Props, ResponseData } from "@/types/types";

export default function EventsPage({ events }: any) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.data.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt: EventType) => (
        <EventItem key={evt.id + ""} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
  const events: ResponseData = await res.json();

  return {
    props: { events },
    revalidate: 1
  };
}
