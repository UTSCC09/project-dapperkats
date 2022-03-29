import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { CardMedia } from '@mui/material';
import { IconButton } from '@mui/material';

export function SuggestionContent (props) {
    const {description, imageId} = props;

    return (
        <div className="marker-content" maxWidth="sm">
            <CardMedia 
                sx={{minHeight: "200px", minWidth: "200px"}}
                component="img" 
                image={process.env.NODE_ENV === "production" ? 
                "https://api.coordinatea.me/api/image/" + imageId + "/" : "http://localhost:5000/api/image/" + imageId + "/"}>
                </CardMedia>
            <Typography sx={{display:"block", maxHeight: "120px", overflow: "auto"}} variant="body1">{description}</Typography>
        </div>
    )
}