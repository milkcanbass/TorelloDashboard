import React, { useState } from "react";

import { logout } from "../AuthService";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WebOutlinedIcon from "@material-ui/icons/WebOutlined";
import logo from "../images/logo.png";
import BlueButton from "./BlueButton";
import AppBar from "@material-ui/core/AppBar";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TitleInputModal from "../components/TitleInputModal";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { getCurrentBoard } from "../AuthService";

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;
  const [calendarView] = useState(path.includes("/calendar") ? true : false);
  let dashboardId = getCurrentBoard();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick2 = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const logoutTrigger = () => {
    logout();
  };

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: 100,
      backgroundColor: "white",
      padding: "0px 25px"
    },
    link: {
      display: "flex",
      fontSize: " 20px",
      marginRight: 30,
      marginLeft: 30,
      "&:hover": {
        cursor: "pointer"
      }
    },
    link2: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: " 20px",

      "&:hover": {
        cursor: "pointer"
      }
    },
    inactive: {
      color: "#545454"
    },
    wrapper: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    btn: {
      color: "white",
      backgroundColor: "#759CFC",
      marginRight: 6000
    },
    menuButton: {
      display: "none",
      width: 100,
      color: "white",
      [theme.breakpoints.down("sm")]: {
        display: "block"
      }
    }
  }));

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5"
    }
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

  const classes = useStyles();

  return (
    <div>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <Grid
            position='static'
            container
            direction='row'
            alignItems='center'
            justify='space-between'
            className={classes.root}>
            <img src={logo} alt='logo' className={classes.kanban} />
            <div className={classes.wrapper}>
              <Link to={`/dashboards/${dashboardId}`}>
                <div className={`${classes.link} ${calendarView && classes.inactive}`}>
                  <WebOutlinedIcon className={classes.icon} />
                  <Typography>Dashboard</Typography>
                </div>
              </Link>
              <Link to={`/calendar/${dashboardId}`}>
                <div className={`${classes.link} ${!calendarView && classes.inactive}`}>
                  <CalendarTodayIcon className={classes.icon} />
                  <Typography>Calendar</Typography>
                </div>
              </Link>
            </div>
            <div className={classes.wrapper}>
              <BlueButton mini className={classes.btn} onClick={handleClickOpen}>
                <AddIcon className={classes.icon} />
                <Typography>Create board</Typography>
              </BlueButton>
              <DropDownMenu topNav />
            </div>
            <Button
              aria-controls='customized-menu'
              aria-haspopup='true'
              variant='contained'
              color='primary'
              className={classes.menuButton}
              onClick={handleClick2}>
              Open Menu
            </Button>
            <StyledMenu
              id='customized-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose2}>
              <StyledMenuItem>
                <ListItemIcon>
                  <Link
                    to={`/dashboards/${dashboardId}`}
                    className={`${classes.link2} ${calendarView && classes.inactive}`}>
                    <WebOutlinedIcon className={classes.icon} />
                    <Typography>Dashboard</Typography>
                  </Link>
                </ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <Link
                    to={`/calendar/${dashboardId}`}
                    className={`${classes.link2} ${!calendarView && classes.inactive}`}>
                    <CalendarTodayIcon className={classes.icon} />
                    <Typography>Calendar</Typography>
                  </Link>
                </ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon onClick={handleClickOpen}>
                  <AddIcon className={classes.icon} />
                  <Typography>Create board</Typography>
                </ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon onClick={logoutTrigger}>
                  <ExitToAppIcon className={classes.icon} />
                  <Typography>Logout</Typography>
                </ListItemIcon>
              </StyledMenuItem>
            </StyledMenu>
          </Grid>
        </Toolbar>
      </AppBar>
      <TitleInputModal open={open} handleClose={handleClose} dashboard />
    </div>
  );
};
export default TopNav;
