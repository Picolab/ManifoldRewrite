import ActionTypes from '../actions';
import { fromJS, Map } from 'immutable';

export default function(state = Map({}), action){
  switch (action.type) {
    case ActionTypes.DISCOVERY_SUCCESS:
      const picoID = action.meta.picoID;
      const directives = action.payload.data.directives;
      let identity = {};
      directives.forEach((directive) => {
        const rid = directive.meta.rid;
        const { bindings, app, iconURL } = directive.options;
        const { name } = app;
        identity[rid] = {
          rid,
          bindings,
          name,
          iconURL
        }
      });
      return state.setIn([picoID], fromJS(identity));
    default:
      return state;
  }
}
