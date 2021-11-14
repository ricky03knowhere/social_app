import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "@mui/material/Grid";

import Screams from "../components/scream/Screams";
import StaticProfile from "../components/profile/StaticProfile";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

class User extends Component {
  state = { profile: null, screamIdParam: null };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamsIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams.length === 0 ? (
      <p>No scream from this user.</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Screams key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Screams key={scream.screamId} scream={scream} />;
        else
          return <Screams key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
