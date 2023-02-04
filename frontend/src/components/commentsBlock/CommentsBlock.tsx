import React from 'react';
import {comments} from "../../types";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {useAppDispatch} from "../../app/hooks";
import {deleteComment, getComments} from "../../features/Comments/commentsThunks";
import {LoadingButton} from "@mui/lab";

interface Props {
    props: comments;
    id: string;
    deleting: boolean
}

const CommentsBlock: React.FC<Props> = ({props, id, deleting}) => {
    const dispatch = useAppDispatch();

    const onDelete = async () => {
        await dispatch(deleteComment(props.id));
        await dispatch(getComments(id));
    }

    return (
        <Box>
            <Card sx={{
                marginTop: '10px',
                bgcolor: '#B1D4E0',
                borderRadius: '30px',
                border: '2px',
                borderColor: '#000'
            }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10} >
                    <Typography gutterBottom variant="h5" component="div">
                        <br/> <b>{props.author}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.text}
                    </Typography>
                        </Grid>
                    <LoadingButton sx={{color: '#000'}} loading={deleting} onClick={onDelete}><b>Delete</b> </LoadingButton>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CommentsBlock;