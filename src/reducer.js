import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const { id } = action.payload;
    const newCart = new Map(state.cart); //Can't mutate existing state
    newCart.delete(id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    if (item.amount === 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(
      action.payload.cart.map((item) => {
        return [item.id, item];
      })
    );
    return { ...state, loading: false, cart: newCart };
  }
  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
