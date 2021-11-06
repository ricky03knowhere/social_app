import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Screams from "../components/scream/Screams";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((data) => <Screams key={data.screamId} screams={data} />)
    ) : (
      <p>Loading datas...</p>
    );
    return (
      <Grid container spacing={16} justifyContent="space-evenly">
        <Grid item sm={7} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
