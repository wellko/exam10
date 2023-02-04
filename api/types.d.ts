export interface news {
	id: string;
	title: string;
	text: string;
	image: string | null;
	createdAt?: Date;
}

export type newsWithOutText = Omit<news, 'text'>

export type newsWithOutId = Omit<news, 'id'>

export interface comments {
	id: string;
	news_id: string;
	author: string;
	text: string
}

export type commentsWithOutID = Omit<comments, 'id'>
