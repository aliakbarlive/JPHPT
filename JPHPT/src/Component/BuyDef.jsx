import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react'
import { useState } from 'react';
import './Ui/buydef.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Matching1Fun } from '../redux/Actions'


const useStyle = makeStyles((theme) => ({
    paginator: {
        justifyContent: "center",
        padding: "10px",
        borderRadius: "20px"
    }
}))


export default function BuyDef() {

    const { OrdersArray, sellingOrders, sellPrice } = useSelector(
        (state) => state.UserReducers
    );

    let selToJpht = sellPrice / 100;

    const dispatch = useDispatch()
    const classes = useStyle()
    const [page, setPage] = useState(1);
    const itemPrPage = 5;

    const [noOfPage] = useState(
        Math.ceil(sellingOrders.length / itemPrPage)
    )

    const handlePageChange = (e, value) => {

        setPage(value)
        // console.log('page' ,value);
    }

    return (<>

        <div class="sc-lcujXC bjgnTR">
            <div class="sc-kLgntA iHaOcn">
                <div class="home container">
                    <div class="home-order mb-home">
                        <div className="home-order__create-order">
                            <div class="create-order">
                                <div class="sc-ezrdKe bAYFRD">
                                    <div class="sc-giIncl gHUUHu false ">
                                        <div class="lco-head">
                                            <div class="lco-head__title">
                                                <img type="normal" src="/img/icon-payment-buy.6a9aff18.svg" alt=""
                                                    loading="lazy" class="sc-bdfBwQ iXgbQJ" />
                                                <p class="sc-gsTCUz bhdLno" style={{
                                                    fontSize: "20px",
                                                    color: "rgb(255, 255, 255)", fontWeight: "bold"
                                                }}>You want to buy JPHTP?</p>
                                            </div>
                                            <div class="lco-head__event">
                                            <Link to={`/Order/${0}`}>
                                            <button class="sc-iBPRYJ cOWINi plus" aria-describedby="buy">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                    viewBox="0 0 12 16" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
                                                </svg>
                                            </button>
                                            </Link>
                                        </div>
                                        </div>

                                        <div class="lco-content">
                                            <div class="table">
                                                <div class="tbody">

                                                    {sellingOrders && sellingOrders ? sellingOrders
                                                        .slice((page - 1) * itemPrPage, page * itemPrPage)
                                                        .filter((citem, i) => +citem.amount !== 0)
                                                        .map((item, i) => {
                                                            const { amount, maxAmount, id, minAmount } = item;

                                                            return (
                                                                <>
                                                                    <Link to={`/buy-def/${id}`} key={i}>
                                                                        <div class="sc-iJuUWI fTbwUB tr">
                                                                            <div class="coi-value">
                                                                                <div class="coi-value__remaining mb-p">
                                                                                    <p class="remaining"><span>Amount : </span>{amount} </p>
                                                                                </div>
                                                                                <div class="coi-value__remaining">
                                                                                    <p class="remaining"><span>Limit : </span>{maxAmount} - {minAmount}  </p>
                                                                                </div>
                                                                            </div>

                                                                            <div class="coi-btn">
                                                                                <Link to={`/buy-def/${id}`}>
                                                                                    <button class="sc-iBPRYJ cOWINi create"
                                                                                        aria-describedby="">Buy</button>
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                    </Link>
                                                                </>
                                                            )
                                                        })
                                                        : (
                                                            sellingOrders.amount != 0 && <p style={{ color: "white", textAlign: "center" }}>No data</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div class="pagination">
                                                <Box component="span">
                                                    <Pagination count={noOfPage} page={page} onChange={handlePageChange}
                                                        defaultPage={1} classes={{ ul: classes.paginator }} />
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="create-order">
                                <div class="sc-bYEvPH khGBIg">
                                    <div class="sc-giIncl gHUUHu false ">
                                        <div class="lco-head">
                                            <div class="lco-head__title">
                                                <img type="normal" src="/img/icon-payment-sell.29fa1b07.svg" alt=""
                                                    loading="lazy" class="sc-bdfBwQ iXgbQJ" />
                                                <p class="sc-gsTCUz bhdLno" style={{
                                                    fontSize: "20px"
                                                    , color: "rgb(255, 255, 255)", fontWeight: "bold"
                                                }}>You want to sell JPHPT?
                                            </p>
                                            </div>
                                            <div class="lco-head__event">

                                                <Link to={`/Order/${1}`}>
                                                    <button class="sc-iBPRYJ cOWINi plus" aria-describedby="sell">
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                            viewBox="0 0 12 16" height="1em" width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
                                                        </svg>
                                                    </button>
                                                </Link>

                                            </div>
                                        </div>

                                        <div class="lco-content">
                                            <div class="table">
                                                <div class="tbody">
                                                    {
                                                        sellingOrders && sellingOrders ? sellingOrders
                                                            .map((item, i) => {
                                                                const { id, amount, minAmount, maxAmount } = item
                                                                return (
                                                                    <a key={id}>
                                                                        <div class="sc-iJuUWI fTbwUB tr">
                                                                            <div class="coi-value">
                                                                                <div class="coi-value__price">
                                                                            <p class="sc-gsTCUz bhdLno price" style={{fontSize: "1rem" ,
                                                                                color: "rgb(255, 161, 67)" , fontWeight: "bold" }}>{selToJpht ? selToJpht:"0"}
                                                                            </p>
                                                                            <p class="sc-gsTCUz bhdLno" style={{fontSize: "1rem" ,
                                                                                color: "rgb(255, 255, 255)" , fontWeight: "bold" }}>
                                                                                USDT/JPHPT</p>
                                                                        </div> 
                                                                        <div class="coi-value__remaining mb-p">
                                                                            <p class="remaining"><span>Amount : </span>{amount} </p>
                                                                        </div>
                                                                        <div class="coi-value__remaining">
                                                                            <p class="remaining"><span>Limit : </span> {maxAmount} -{minAmount} </p>
                                                                        </div>
                                                                            </div>

                                                                            <div class="coi-address">
                                                                        <div class="sc-pFZIQ gbgfMs">
                                                                            <img type="normal" src="/img/icon-address.66289419.svg"
                                                                                alt="" loading="lazy" class="sc-bdfBwQ iXgbQJ" />
                                                                            <p class="sc-gsTCUz bhdLno text-value" style={{
                                                                                fontSize: "1rem" ,color: "rgb(255, 255, 255)" }}>
                                                                                TG2qV...NBck6</p>
                                                                        </div>
                                                                    </div>
                                                                            <div class="coi-btn">
                                                                        <button disabled class="sc-iBPRYJ cOWINi create"
                                                                            aria-describedby=""
                                                                            onClick={()=>dispatch(Matching1Fun(id,amount))}
                                                                            >Sell</button>
                                                                    </div>
                                                                        </div>
                                                                    </a>

                                                                )
                                                            }) : (
                                                            <p style={{ color: 'white', textAlign: "center" }}>No data</p>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                            <div class="pagination">
                                                <div class="sc-cxFLnm izBVou">
                                                    <div aria-disabled="true" class="nav nav-prev"><svg stroke="currentColor"
                                                        fill="currentColor" stroke-width="0" viewBox="0 0 16 16"
                                                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M7 3.093l-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z">
                                                        </path>
                                                    </svg>
                                                    </div>
                                                    <div class="content-pagi">
                                                        <div class="item active">
                                                            <p class="sc-gsTCUz bhdLno" style={{
                                                                fontSize: " 1rem",
                                                                color: "rgb(255, 255, 255)"
                                                            }}>1</p>
                                                        </div>
                                                    </div>
                                                    <div aria-disabled="true" class="nav nav-next">
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                            viewBox="0 0 16 16" height="1em" width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M9 13.887l5-5V8.18l-5-5-.707.707 4.146 4.147H2v1h10.44L8.292 13.18l.707.707z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}
