export interface news {
	id: string;
	title: string;
	text: string;
	image: string | null;
	createdAt: string;
}

export interface comments {
	id: string;
	news_id: string;
	author: string;
	text: string
}

