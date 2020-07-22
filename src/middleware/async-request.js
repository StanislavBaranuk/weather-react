export default (storeAction, callback, ...params) => {
  return function(dispatch) {
    return callback(...params).then(data => dispatch(storeAction(data)))
  }
};
