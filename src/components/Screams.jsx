import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


const styles = {
  card: {
    diplay: "flex",
    marginBottom: 20,
  },
  picture: {
    width: 200,
    height: 140,
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
      screams: {
        screamId,
        body,
        userHandle,
        createdAt,
        commentCount,
        likeCount,
        userImage,
      },
    } = this.props;

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
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Screams);
