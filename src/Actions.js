import {store} from "./index"
import axios from "axios"

function fetchReddit(dispatch) {
  return function(event){

    axios.get('https://www.reddit.com/r/cats.json')
      .then(function (response) {
        dispatch({
          type: "LOAD_SUBREDDITS",
          payload: response.data.data.children
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function showNext(dispatch) {
  return function(event){
    dispatch({
      type: "SHOW_NEXT",
      payload: {}
    });
  };
}

function showPrevious(dispatch) {
  return function(event){
    dispatch({
      type: "SHOW_PREVIOUS",
      payload: {}
    });
  };
}


export default function(dispatch) {
  return {
    fetchReddit: fetchReddit(dispatch),
    showNext: showNext(dispatch),
    showPrevious: showPrevious(dispatch),
  }
}
