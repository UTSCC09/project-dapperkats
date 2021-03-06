import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
    Grid,
    Container,
    TextField,
    Alert
} from '@mui/material';
import { Snackbar } from '@material-ui/core';


export function CommentForm(props) {

    const { getComments, parentId } = props;
    const [snackbar, setSnackbar] = useState();
    const [open, setOpen] = useState();

    const createCommentMutation = gql`
        mutation($parentId: ID, $content: String) {
            createComment(parentId: $parentId, content: $content) {
                username
                content
                createdAt
            }
        }
    `


    const [createComment, { data, loading, error }] = useMutation(createCommentMutation, {
        onCompleted: (data) => {
            getComments()
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            createComment({
                variables: {
                    parentId: parentId,
                    content: data.get('content')
                }
            });
            event.currentTarget.reset();
        } catch (error) {
            console.log(error);
        }
    }

    const setErrorSnackbar = (message) => {
        setSnackbar(message);
        setOpen(true);
    }

    useEffect(() => {
        if (!loading && error) {
            setErrorSnackbar(error.message);
        }
    }, [error])

    return (
        <Container maxWidth="md" component='form' onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        color='secondary'
                        id="content"
                        placeholder='Write something...'
                        name="content"
                        autoComplete="content"
                        autoFocus
                    />
                </Grid>
            </Grid>
            <Snackbar open={open} onClose={(() => setOpen(false))} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbar}
                </Alert>
            </Snackbar>
        </Container>
    )
}