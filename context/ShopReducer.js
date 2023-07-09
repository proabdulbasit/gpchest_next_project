// Initial State
export const initialState = {
  basket: [],
};

export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price * item.count + amount, 0);
};

export const getName = (basket) => {
  return basket?.find((item) => item.hasOwnProperty("name"));
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let exists = false;
      const cart = [...state.basket];
      let modCart = [];

      const copy = cart.findIndex(
        (item) => !item.name && item.id === action.payload.id
      );

      if (copy >= 0) {
        exists = true;

        cart[copy].count += 1;

        modCart = [...cart];
      } else {
        exists = false;
      }

      if (exists) {
        return {
          ...state,
          basket: [...modCart],
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.payload],
        };
      }

    case "REMOVE_FROM_CART":
      const itemIndex = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      if (itemIndex >= 0) {
        newBasket.splice(itemIndex, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "EMPTY__CART":
      return initialState;
    default:
      return state;
  }
};

export default shopReducer;
