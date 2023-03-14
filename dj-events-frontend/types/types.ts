export interface EventType {
  id: Number;
  name: String;
  slug: String;
  venue: String;
  address: String;
  performers: String;
  date: String;
  time: String;
  description: String;
  image: {
    formats: {
      medium: {
        url: String
      }
      thumbnail: {
        url: String
      }
    }
  };
}

export interface Props {
  events: EventType[];
}


export type QueryType = {
  query: Slug
}

export type ParamsType = {
  params: Slug
}

export type Slug = {
  slug: String
}