import ActionTypes from '../actions';
export default function(state = {}, action){
  switch (action.type) {
    case ActionTypes.DISCOVERY_SUCCESS:
      //console.log("action in discovery:",action);
      //var newState = _.mapValues(state, function(o){ return o; })//make a copy of the original object
      var newState = JSON.parse(JSON.stringify(state));
      const apps = action.payload.data.directives;
      newState[action.picoID] = apps
      return newState;
    default:
      return state;
  }
}
