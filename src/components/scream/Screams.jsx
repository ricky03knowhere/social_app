import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import ChatIcon from "@material-ui/icons/Chat";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";

import MyButton from "../../utils/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    diplay: "flex",
    marginBottom: 20,
  },
  picture: {
    width: 200,
    height: "100%",
    float: "left",
    marginRight: 30,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Screams extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        screamId,
        body,
        userHandle,
        createdAt,
        commentCount,
        likeCount,
        userImage,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile picture"
          className={classes.picture}
          component="img"
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1">{body}</Typography>

          <LikeButton screamId={screamId} />
          <span>
            <>{likeCount}</> Likes
          </span>

          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Screams.propTypes = {
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  screams: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Screams));
