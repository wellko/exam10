export interface news {
	id: string;
	title: string;
	text: string;
	image: string | null;
	createdAt: string;
}

export type newsWithOutId = Omit<news, 'id'>

export type newsPostData = Omit<newsWithOutId, 'createdAt'>

export interface comments {
	id: string;
	news_id: string;
	author: string;
	text: string
}

export type commentsWithOutID = Omit<comments, 'id'>
