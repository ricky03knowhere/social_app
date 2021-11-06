import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        let comments = state.scream.comments;
        state.scream = action.payload;
        state.scream.comments = comments;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      let idx = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      let updatedScreams = JSON.parse(JSON.stringify(state.screams));
      updatedScreams[idx].commentCount += 1;
      return {
        ...state,
        screams: updatedScreams,
        scream: {
          ...state.scream,
          comments: [action.payload.comment, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1,
        },
      };

    default:
      return state;
  }
}
