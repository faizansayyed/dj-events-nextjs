import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { EventType, ResponseData } from '@/types/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

export default function SearchPage({ events }: any) {
    const router = useRouter()

    return (
        <Layout title='Search Results'>
            <Link href='/events'>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.data && events.data.length === 0 && <h3>No events to show</h3>}

            {events.data && events.data.map((evt: EventType) => (
                <EventItem key={evt.id + ""} evt={evt} />
            ))}
        </Layout>
    )
}

interface Query extends ParsedUrlQuery {
    term: string
}

interface Props {
    events: ResponseData
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({ query }) => {
    const { term } = query

    const queryParam = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                { venue_contains: term },
            ],
        },
    })

    const res = await fetch(`${API_URL}/events?${queryParam}`)
    const events: ResponseData = await res.json()
    return {
        props: { events },
    }
}