import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { CardMedia } from '@mui/material';
import { IconButton } from '@mui/material';
import './MarkerContent.css'

export function MarkerContent (props) {
    const {handleBack, title, images, description} = props;

    return (
        <Container className="marker-content" maxWidth="sm">
            <IconButton onClick={handleBack}>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="blue"
                    >
                        Go back
                </Typography>
            </IconButton>
            <Typography variant="h2">{title}</Typography>
            {images &&
                <CardMedia component="img" 
                    image={process.env.NODE_ENV === "production" ? 
                    "https://api.coordinatea.me/api/image/" + images + "/" : "http://localhost:5000/api/image/" + images + "/"}>
                </CardMedia>
            }
            <Typography variant="body1">{description}</Typography>
        </Container>
    )
}