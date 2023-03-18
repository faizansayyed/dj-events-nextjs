import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { EventType } from "@/types/types";

interface Props {
  evt: EventType;
}
export default function EventItem({ evt }: Props) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.attributes.image ? evt.attributes.image.data.attributes.formats.thumbnail.url : ("/images/event-default.png" as any)}
          alt={evt.attributes.name as any}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date as string).toLocaleDateString('en-US')} at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
