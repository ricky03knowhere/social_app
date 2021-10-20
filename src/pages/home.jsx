import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Screams from "../components/Screams";
import Profile from "../components/Profile";

class Home extends Component {
  state = {
    screams: null,
  };

  componentDidMount() {
    axios
      .get("screams")
      .then((res) => {
        // console.log(res.data);
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let screamsData = this.state.screams ? (
      this.state.screams
        // .filter((data) => data.commentCount === 5)
        .map((data) => <Screams key={data.screamId} screams={data} />)
    ) : (
      <p>Loading datas...</p>
    );
    return (
      <Grid container spacing={16} justifyContent="space-evenly">
        <Grid item sm={7} xs={12}>
          {screamsData}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
