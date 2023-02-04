import React from 'react';
import {news} from "../../types";
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../constants";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteNews, getNews} from "../../features/News/newsThunks";
import {selectStateOfDeleting} from "../../features/News/newsSlice";
import {LoadingButton} from "@mui/lab";

interface Props {
	props: news;
}

const NewsBlock: React.FC<Props> = ({props}) => {
	const dispatch = useAppDispatch();

	const deleting =useAppSelector(selectStateOfDeleting);

	const onDelete = async () => {
		await dispatch(deleteNews(props.id));
		await dispatch(getNews());
	}

	const ImageUrl = apiUrl + '/images/' + props.image;

	const date = dayjs(props.createdAt).format('YYYY-MM-DD HH:mm:ss')
	return (
		<Box marginTop={4}>
			<Card>
				<Box maxWidth='40%'>
					{props.image ? <CardMedia
						component="img"
						image={ImageUrl}
						title={props.image}
					/> : null}</Box>
				<CardContent>
					<Grid container>
						<Grid item xs={9}>
							<Typography gutterBottom variant="h5" component="div">
								<br/> <b>{props.title}</b>
							</Typography>
							<Typography variant="body2" color="text.secondary">
								<b>created at:</b> <br/> {date}
							</Typography>
						</Grid>
						<Grid container alignItems='flex-end' xs={3}>
							<Link to={'/news/' + props.id}>Watch more. . .</Link>
							<LoadingButton sx={{marginLeft: '30px'}} loading={deleting} onClick={onDelete}> Delete</LoadingButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>

	);
};

export default NewsBlock;