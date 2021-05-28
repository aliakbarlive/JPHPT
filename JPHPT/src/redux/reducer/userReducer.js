
let initState = {
  userWalletAddress: "",
  contract: '',
  tronWeb: '',
  amount: "",
  price: "",
  miniAmount: "",
  id: "",
  name: "",
  buyPrice: "",
  sellPrice: "",
  balance: '',
  OrdersArray: "",
  sellingOrders: ''

};

export const UserReducers = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {

    case "SELLING_ORDERS":

      // console.log(payload, "this is the payload data=======>")
      return {
        ...state,
        sellingOrders: payload,
      };

    case "ORDERS_ARRAY":
      return {
        ...state,
        OrdersArray: payload,
      };
    case "BALANCE":
      return {
        ...state,
        balance: payload,
      };

    case "BUYPRICE":
      return {
        ...state,
        buyPrice: payload,
      };
    case "SELL_PRICE":
      return {
        ...state,
        sellPrice: payload,
      };
    case "NAME":
      return {
        ...state,
        name: payload,
      };
    case "ID":
      return {
        ...state,
        uId: payload,
      };
    case "MAXAMOUNT":
      return {
        ...state,
        maxAmount: payload,
      };

    case "PRICE":
      return {
        ...state,
        newPrice: payload,
      };

    case "MINIAMOUNT":
      return {
        ...state,
        miniAmount: payload,
      };

    case "AMOUNT":
      return {
        ...state,
        amount: payload,
      };

    case "TRONWEB":
      return {
        ...state,
        tronWeb: payload,
      };

    case "CONTRACT":
      return {
        ...state,
        contract: payload,
      };

    case "USER_WALLET_ADDRESS":
      return {
        ...state,
        userWalletAddress: payload,
      };

    default:
      return state;
  }

};
