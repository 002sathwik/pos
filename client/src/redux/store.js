import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer,
});

// Retrieve cart items from local storage or use an empty array as initial state
const storedCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  rootReducer: {
    cartItems: storedCartItems,
  },
};

const middleware = [thunk];

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
