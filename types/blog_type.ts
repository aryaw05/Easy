export type BlogType = {
  data: {
    id: number;
    user_id: number;
    title: string;
    slug?: string | null;
    content: {
      time: number;
      blocks: {
        id: string;
        type: string;
        data: {
          text: string;
        };
      }[];
      version: string;
    };
    read_time?: number | null;
    thumbnail_url: string;
    is_published?: boolean | null;
    created_at: string;
    updated_at: string;
  }[];
};
