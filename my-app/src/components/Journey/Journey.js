import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import "./Journey.css"

//todo: upvote/downvote feature
export function Journey(props) {
    const { journey } = props;

    return (
        <Card className="journey-card" sx={{maxWidth: 500}}>
            <CardHeader
                titleTypographyProps={{variant: 'h6', align: 'left'}}
                subheaderTypographyProps={{variant: 'body2', align: 'left'}}
                title={journey.title}
                subheader={journey.fromDate + ' to ' + journey.toDate}
            />
            <CardMedia
                className="img"
                component="img"
                height="194"
                image={"http://localhost:5000/api/image/" + journey.imageId + "/"}
                alt="Failed to retrieve image"
            />
            <CardContent>
                <Typography align='left' variant="body1" color="text.secondary">
                    {journey.description}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" align='left' color="text.secondary">
                posted by {journey.username}
                </Typography>
            </CardContent>
            <CardActions sx={{paddingTop: 4}} disableSpacing>
                <IconButton aria-label="upvote">
                <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="downvote">
                <ThumbDownIcon />
                </IconButton>
            </CardActions>
            </Card>
    )
}