import React, { Component } from 'react';
import * as Utils from "../../common/Util";
import Header from '../../common/header/Header';
import './Details.css';

import Button from '@material-ui/core/Button';
import { SvgIcon, withStyles } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fastfood from '@material-ui/icons/Fastfood';
import Search from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'; 
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class Details extends Component {

    constructor(props) {

        super(props);

        this.state = {
            restaurant: {
                restaurant_name: "",
                photo_URL: "",
                customer_rating: "",
                
            },
            /**posts: 0,
            follows: 0,
            followed_by: 0,
            access_token: sessionStorage.getItem('access-token'),
            //accessToken: '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',
            editOpen: false,
            fullNameRequired: 'dispNone',
            newFullName: '',
            mediaData: null,
            currentItem: null,
            likeSet: new Set(),
            comments: {}, **/
            imageModalOpen: false
        }
    }

    componentWillMount() {
        let that = this;
        let id = "246165d2-a238-11e8-9077-720006ceb890";
        let baseUrl = "http://localhost:8080/api";
        let dataRestaurant = null;
        let xhrRestaurant = new XMLHttpRequest();
        xhrRestaurant.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurant: JSON.parse(this.responseText)
                });
            }
        });

        //xhrRestaurant.open("GET", this.props.baseUrl + "restaurant/" + this.props.match.params.id);
        xhrRestaurant.open("GET", baseUrl + "/restaurant/" + id);
        xhrRestaurant.setRequestHeader("Accept", "application/json;charset=UTF-8");
        xhrRestaurant.send(dataRestaurant);
    }

    render() {
        let restaurant = this.state.restaurant;

        return (
            <div className="details">
                <Header />
                <div className="restaurant-information">
                    <div className="leftDetails">
                        <img style={{ height: '100%', width: '100%', padding: '20px'}} src={restaurant.photo_URL} alt={restaurant.restaurant_name} />
                    </div>
                    <span style={{ marginLeft: "20px", padding: '40px' }}>
                        <div style={{ width: "600px", fontSize: "big" }}> {restaurant.restaurant_name} <br /> <br />
                            <div style={{ float: "left", width: "200px", fontSize: "small" }}> {restaurant.average_price} </div>
                             
                        </div>
                        
                    </span>
                </div>
            </div>
        )
    }
}

export default Details;