const initialState = {
  loading: false,
  cartItems: [], // Corrected variable name
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-TO-CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DELTE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) =>
          item._id !== action.payload._id ),
      };

    default:
      return state;
  }
};
