import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import avatar from '../../static/avatar.png';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import CreateIcon from '@mui/icons-material/Create';
import home from '../../static/home.svg'

/*
Citation:
Navbar adapted from MUI example: https://mui.com/components/app-bar/ (BASIC NAVBAR)
*/
const ResponsiveAppBar = (props) => {

  const { username, setUsername } = props;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    const requestOptions = {
      credentials: 'include'
    }
    fetch(process.env.NODE_ENV === "production" ? 'https://api.coordinatea.me/signout' : 'http://localhost:5000/signout', requestOptions).then(res => {
      setUsername(null)
    })
    setAnchorElUser(null);
  }

  return (
    <AppBar elevation={0} position="static" sx={{ backgroundColor: 'secondary' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ color: "white", textDecoration: 'none' }}>
            <img src={home} style={{ height: '5vh' }} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {username ?
              (<div><IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Link to="/following" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography>Following</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/journey/create" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography>Create Journey</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/citation" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography>Citation</Typography>
                    </MenuItem>
                  </Link>
                </Menu></div>) : (<></>)}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          ><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              COORDINATE</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {username ?
              <div style={{ display: 'flex' }}>
                <Link to="/following" style={{ textDecoration: 'none' }}>
                  <Button sx={{ my: 2, display: 'flex', color: 'primary.text' }} >
                    <FavoriteIcon sx={{ mr: 1 }} />
                    <Typography>Following</Typography>
                  </Button>
                </Link>
                <Link to="/journey/create" style={{ textDecoration: 'none' }}>
                  <Button sx={{ my: 2, display: 'flex', color: 'primary.text' }} >
                    <CreateIcon sx={{ mr: 1 }} />
                    <Typography>Create Journey</Typography>
                  </Button>
                </Link>
                <Link to="/citation" style={{ textDecoration: 'none' }}>
                  <Button sx={{ my: 2, display: 'flex', color: 'primary.text' }} >
                    <PublicIcon sx={{ mr: 1 }} />
                    <Typography>Citation</Typography>
                  </Button>
                </Link>
              </div>
              : <></>}
          </Box>
          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={avatar} />
                {username ? (<Typography sx={{ ml: 1, fontSize: 20, color: 'white' }}>{username} </Typography>) : <></>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!username ?
                <div>
                  <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem onClick={(e) => { setAnchorElUser(null); }}>
                      <Typography>Sign Up</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/signin" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem onClick={(e) => { setAnchorElUser(null); }}>
                      <Typography>Sign In</Typography>
                    </MenuItem>
                  </Link>
                </div> :
                <div>
                  <Link to={"/profile/" + username} style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem onClick={(e) => { setAnchorElUser(null); }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography align='left'>Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem onClick={handleLogout}>
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Link>
                </div>}
            </Menu>
          </Box>
        </Toolbar >
      </Container >
    </AppBar >
  );
};
export default ResponsiveAppBar;
