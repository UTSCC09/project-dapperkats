import { Typography } from '@mui/material';
import { CardMedia } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function SuggestionContent (props) {
    const {description, imageId, username, suggestionId, canDelete, removeSuggestion} = props;

    return (
        <div className="marker-content">
            {imageId && 
                <CardMedia 
                    sx={{minHeight: "200px", minWidth: "200px"}}
                    component="img" 
                    image={process.env.NODE_ENV === "production" ? 
                    "https://api.coordinatea.me/api/image/" + imageId + "/" : "http://localhost:5000/api/image/" + imageId + "/"}>
                    </CardMedia>
                }
            <Typography sx={{padding: "10px", display:"block", maxHeight: "140px", overflow: "auto"}} variant="body1">{description}</Typography>
            <Typography sx={{paddingLeft: "10px", paddingRight:"10px", display:"block", maxHeight: "120px", overflow: "auto"}} variant="body2">
                {"suggested by " + username}
                {canDelete &&
                    <IconButton onClick={((e) => removeSuggestion(e, suggestionId))}>
                        <DeleteIcon/>
                    </IconButton>}
            </Typography>
        </div>
    )
}