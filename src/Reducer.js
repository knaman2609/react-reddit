import * as R from "ramda"

var AppState = {
  data: [],
  currentDisplayIndex: 10
};


const reducer = (state = AppState , action) => {
  switch(action.type) {
    case "LOAD_SUBREDDITS":

      var newState = R.clone(state);
      var list = [];

      action.payload.forEach(function(item) {
        if (item.data.thumbnail_width) {
          item.display = "visible";
          list.push(item);
        }
      });

      newState.data = list;
    newState.currentDisplayIndex = list.length;

      return R.merge(state, newState);

    case "SHOW_NEXT":
      var newState = R.clone(state);

      if (newState.currentDisplayIndex < newState.data.length - 1)
      newState.currentDisplayIndex  = newState.currentDisplayIndex + 1;

      return R.merge(state, newState);

    case "SHOW_PREVIOUS":
      var newState = R.clone(state);


      if (newState.currentDisplayIndex > 0)
      newState.currentDisplayIndex  = newState.currentDisplayIndex - 1;

      return R.merge(state, newState);
  }

  return state;
}

export default reducer;
