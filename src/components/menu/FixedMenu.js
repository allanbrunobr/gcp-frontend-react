import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const FixedMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

    const handleMouseEnter = (event, menu) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(menu);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setOpenMenu(null);
    };

    const handleMenuItemClick = (route) => {
        setAnchorEl(null);
        setOpenMenu(null);
        navigate(route);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#8E4DEF' }}>
            <Toolbar>
                <Button color="inherit" href="/main">
                    Home
                </Button>

                <div
                    onMouseEnter={(e) => handleMouseEnter(e, 'users')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Button color="inherit">
                        Users
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu === 'users'}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                            onMouseEnter: () => setOpenMenu('users'),
                            onMouseLeave: handleMouseLeave,
                        }}
                    >
                        <MenuItem onClick={handleMouseLeave}>Add users (on-hold)</MenuItem>
                        <MenuItem onClick={handleMouseLeave}>Edit users (on-hold)</MenuItem>
                    </Menu>
                </div>

                <div
                    onMouseEnter={(e) => handleMouseEnter(e, 'trips')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Button color="inherit">
                        Trips
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu === 'trips'}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                            onMouseEnter: () => setOpenMenu('trips'),
                            onMouseLeave: handleMouseLeave,
                        }}
                    >
                        <MenuItem onClick={handleMouseLeave} href="/visionLandmarkDetection">
                            Picture your destiny
                        </MenuItem>
                    </Menu>
                </div>

                <div
                    onMouseEnter={(e) => handleMouseEnter(e, 'aiTools')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Button color="inherit">
                        AI / Data Tools
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu === 'aiTools'}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                            onMouseEnter: () => setOpenMenu('aiTools'),
                            onMouseLeave: handleMouseLeave,
                        }}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('/visionFaceDetection')}>What is your mood?</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/sentiment')}>Sentiment Analysis</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/translator')}>Translator</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={handleMouseLeave}>Fraud Detection (in progress)</MenuItem>
                    </Menu>
                </div>

                <Button color="inherit" href="#" id="logout-link">
                    Logout
                </Button>

                <IconButton edge="end" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default FixedMenu;
