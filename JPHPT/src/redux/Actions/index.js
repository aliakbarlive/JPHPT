import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { environment } from "../../environment";

export const UserDataAction = (defaultAddress, tronWeb) => async (dispatch, state) => {

  if (defaultAddress) {
    tronWeb
      .contract()
      .at(environment.contractAddress)
      .then(async (contract) => {
        dispatch({
          type: "USER_WALLET_ADDRESS",
          payload: defaultAddress,
        });

        dispatch({
          type: "CONTRACT",
          payload: contract,
        });

        dispatch({
          type: "TRONWEB",
          payload: tronWeb,
        });

        // buyingordersarray
        contract
          .buyingordersarray(0)
          .call()
          .then((val) => {
            dispatch({
              type: "ORDERS_ARRAY",
              payload: [
                {
                  amount: tronWeb.fromSun(val.amount),
                  minAmount: tronWeb.fromSun(val.miniamount),
                  maxAmount: tronWeb.fromSun(val.maxamount),
                  id: val.id.toNumber(),
                },
              ],
            });
          })




        contract.Sellingarraylength().call().then((val) => {

          // console.log(val.toNumber(), "this s================>")
          if (val.toNumber() > 0) {
            var array = []
            for (let i = 0; i < val.toNumber(); i++) {


              contract
                .sellingordersarray(i)
                .call()
                .then((val) => {

                  // console.log(val, "this is the val,====>")
                  array.push(
                    {
                      amount: tronWeb.fromSun(val.amount),
                      minAmount: tronWeb.fromSun(val.miniamount),
                      maxAmount: tronWeb.fromSun(val.maxamount),
                      id: val.id.toNumber(),
                    }
                  )


                  dispatch({
                    type: "SELLING_ORDERS",
                    payload: array
                  })

                  // let obj = [{

                  //   amount: tronWeb.fromSun(val.amount),
                  //   minAmount: tronWeb.fromSun(val.miniamount),
                  //   maxAmount: tronWeb.fromSun(val.maxamount),
                  //   id: val.id.toNumber(),
                  // }]

                  // dataArray.push(obj)

                  // dataArray.push(obj)
                  // console.log(dataArray.length, "this is the ==>")

                  // dispatch({
                  //   type: "SELLING_ORDERS",
                  //   payload: obj
                  // })
                  // let items = obj.reduce((r, e) => (r.push(...e), r), [])
                  // console.log(obj, "this is the obj====>")
                  // dispatch({
                  // type: "SELLING_ORDERS",
                  // payload: obj
                  // [
                  //   {
                  //     amount: tronWeb.fromSun(val.amount),
                  //     minAmount: tronWeb.fromSun(val.miniamount),
                  //     maxAmount: tronWeb.fromSun(val.maxamount),
                  //     id: val.id.toNumber(),
                  //   },
                  // ],
                  // });
                })

            }
          }
          // dispatch({
          //   type: "SELLING_ORDERS",
          //   payload: array
          // })


        })




        // buyprice
        contract
          .buyprice()
          .call()
          .then((val) => {
            dispatch({
              type: "BUYPRICE",
              payload: val.toNumber(),
            });
          });

        //sellPrice
        contract
          .sellprice()
          .call()
          .then((val) => {
            // console.log("sellprice==>", val.toNumber());
            dispatch({
              type: "SELL_PRICE",
              payload: val.toNumber()
            })
          });

        //orders
        contract
          .orders(1)
          .call()
          .then((val) => {
            dispatch({
              type: "AMOUNT",
              payload: tronWeb.fromSun(val.amount),
            });

            dispatch({
              type: "PRICE",
              payload: tronWeb.fromSun(val.price),
            });

            dispatch({
              type: "MINIAMOUNT",
              payload: tronWeb.fromSun(val.miniamount),
            });

            dispatch({
              type: "MAXAMOUNT",
              payload: tronWeb.fromSun(val.maxamount),
            });

            dispatch({
              type: "ID",
              payload: val.id.toNumber(),
            });

          });

      });

    ///////////////////TOKEN TOW BALANCE

    tronWeb
      .contract()
      .at(environment.tokenAddress2)
      .then((tokenContreact) => {
        tokenContreact
          .balanceOf(defaultAddress)
          .call()
          .then((val) => {
            dispatch({
              type: "BALANCE",
              payload: val.balance.toNumber()
            })
          })

      })

  }
};

// matching1
export const Matching1Fun = (id, amount) => (dispatch, state) => {


  const { contract, tronWeb } = state().UserReducers;
  console.log(id, tronWeb.toSun(amount))
  contract
    .matching1(id, +tronWeb.toSun(amount))
    .send()
    .then((res) => {
      console.log(res)
    }).catch((e) => console.error(e))
}

export const MatchingFun = (id, amount) => (dispatch, state) => {

  const { contract, tronWeb } = state().UserReducers;

  contract
    .matching(id, tronWeb.toSun(amount))
    .send()
    .then((val) => {
      console.log("val===>", val);
    }).catch((err) => {
      toast.error('JPHPT not buy')
    })

}

export const NewOrder = (amount, minAmount, maxAmount) => (
  dispatch,
  state
) => {
  const { contract, tronWeb } = state().UserReducers;

  let SunAmout = tronWeb.toSun(amount);
  let sMinAmount = tronWeb.toSun(minAmount);
  let sMaxAmount = tronWeb.toSun(maxAmount);

  contract
    .NewOrder(SunAmout, sMinAmount, sMaxAmount)
    .send()
    .then((val) => {
      dispatch(UserDataAction(tronWeb.defaultAddress.base58, tronWeb));
      // toast.success('buying order successfull')
    })
    .catch((err) => {
      toast.error("something went wrong");
    });
};

export const SellOrder = (sAmount, sMaxAmount, sMinAmount) => async (
  dispatch,
  state
) => {
  const { contract, tronWeb } = state().UserReducers;
  let amount = tronWeb.toSun(sAmount);
  let maxAmount = tronWeb.toSun(sMaxAmount);
  let minAmount = tronWeb.toSun(sMinAmount);

  if (tronWeb && contract) {
    contract
      .NewOrderselling(amount, maxAmount, minAmount)
      .send()
      .then((val) => {
        console.log("val====>", val);
        toast.success("selling JPHPT successfull");
      });
  }
};


// export const AllowedFun = (userWalletAddress,history)=>async(dispatch,state)=>{
//   const { contract, tronWeb } = state().UserReducers;
//   console.log(contract,"====================================contract>")
//   if(tronWeb){
//     tronWeb
//      .contract()
//      .at(environment.tokenAddress2)
//      .then(async(contract)=>{
//        console.log("allowance",contract);
//   //    contract
//     //   .allowance(userWalletAddress,environment.tokenAddress3)
//     //   .call()
//     //   .then((val)=>{
//     //     console.log(val.remaining.toNumber());
//     //   if(+val.remaining.toNumber()>0){
//     // history.push('/allow')
//     //   }
//     //   })
//      })

//    }
//  }

export const ApprovedUser = (val, history) => async (dispatch, state) => {

  const { contract, tronWeb, userWalletAddress } = state().UserReducers;

  if (tronWeb) {
    tronWeb
      .contract()
      .at(environment.tokenAddress2)
      .then(async (contract) => {
        contract
          .approve(environment.contractAddress, val)
          .send()
          .then((res) => {

            console.log(res, "this is the res====>")
            history.push("/home");
            // toast.success("Approve successfully");
          })
          .catch((err) => {
            toast.error("Failed to approve ");
          });
      });
  }

}
