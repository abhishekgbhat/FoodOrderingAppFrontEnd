import React, { Component } from 'react';
import './Checkout.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import * as Utils from "../../common/Utils";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    root: {
        width: '98%'
    },
    button: {
        marginTop: 50,
        marginTop: 30,
        marginRight: 20,
    },
    actionsContainer: {
        marginBottom: 30,
    },
    formControl: {
        width: "28%"
    },
    select : {
        marginTop: 20
    }
    ,menu : {
        height: 200
    }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 8 * 2}}>
        <Typography component="div" style={{ padding: 8 * 2 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}
class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            paymentMethods: [],
            stateList: [],
            addressList: [],
            activeStep: 0,
            value: 0
            value: 0,
            flatBuildingNo: "",
            locality: "",
            city: "",
            state: "",
            pincode: "",
            flatBuildingNoRequired: "dispNone",
            localityRequired: "dispNone",
            cityRequired: "dispNone",
            stateRequired: "dispNone",
            pincodeRequired:"dispNone",
            validPincode : ""
        }
    }

    componentWillMount() {
        /*
        restaurant_id: this.props.match.params.id,
                    itemList : this.state.addedItemsLists,
                    totalAmount : this.state.totalPrice
                    */
        if (Utils.isUndefinedOrNullOrEmpty(this.props.location.restaurant_id)) {
            this.props.history.push({
                pathname: "/"
            });
        } else {
            console.log(" Call Api to get Payment and state and addresses")
            this.callApiToGetStateList();
            this.callApiToGetPaymentMethods();
            this.callApiToGetAddressListOfCustomer()
        }
    }
    callApiToGetStateList = () => {
        console.log("get State api started")
        let xhrPosts = new XMLHttpRequest();
        let that = this
        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                let data = JSON.parse(this.responseText);
                that.setState({
                    stateList: data.states
                })
            }
        });
        xhrPosts.open("GET", this.props.baseUrl + "/states");
        xhrPosts.send();
    }
    callApiToGetPaymentMethods = () => {
        console.log("get Payment api started")
        let xhrPosts = new XMLHttpRequest();
        let that = this
        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                let data = JSON.parse(this.responseText);
                that.setState({
                    paymentMethods: data.paymentMethods
                })
            }
        });
        xhrPosts.open("GET", this.props.baseUrl + "/payment");
        xhrPosts.send();
    }
    callApiToGetAddressListOfCustomer = () => {
        console.log("get Customer Address api started")
        let xhrPosts = new XMLHttpRequest();
        let that = this
        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText.addresses);
                if (Utils.isUndefinedOrNullOrEmpty(this.responseText.addresses)) {
                    that.setState({
                        addressList : []
                        addressList: []
                    })
                } else {

                }
                console.log(this.status)
                if (this.status === 200) {
                    console.log("success")
                }
                else if (this.status === 401) {
                    //console.log(data.message)
                }
            }
        });
        xhrPosts.open("GET", this.baseUrl + "/address/customer");
        xhrPosts.setRequestHeader('authorization', "Bearer " + sessionStorage.getItem('access-token'));
        xhrPosts.send();
    }
    callApiToSaveAddressOfCustomer = () => {
        let xhrPosts = new XMLHttpRequest();
        let that = this
        var obj = {};
        obj.city = "";
        obj.flat_building_name = "";
        obj.locality = "";
        obj.pincode = "";
        obj.state_uuid = "";
        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText.addresses);
                console.log(this.status)
                if (this.status === 200) {
                    //console.log("success")
                }
                else if (this.status === 401) {
                    //console.log(data.message)
                }
            }
        });
        xhrPosts.open("POST", this.baseUrl + "/address");
        xhrPosts.setRequestHeader('authorization', "Bearer " + sessionStorage.getItem('access-token'));
        xhrPosts.send(obj);
    }
    getSteps() {
        return ['Delivery', 'Payment'];
    }
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    }
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    }
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    handleOpen = () => {
        this.setState({ open: true });
    }

    getStepContent(step) {
        switch (step) {
          case 0:
            return `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`;
          case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
          case 2:
            return `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`;
          default:
            return 'Unknown step';
        }
      }
    inputFlatNumberChangeHandler = (e) => {
        this.setState({
            flatBuildingNo: e.target.value
        })
    }
    inputLocalityChangeHandler = (e) => {
        this.setState({
            locality: e.target.value
        })
    }
    inputCityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    inputStateChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    inputPincodeChangeHandler = (e) => {
        this.setState({
            pincode: e.target.value
        })
    }

    saveAddressHandler = () => {
        console.log("Save Address Clicked")
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;
        const { value } = this.state;
        return (
            <div>
                <Header
                    history={this.props.history}
                    showSearchArea={false} />
                <div className="checkout-main-container">
                    <div className="checkout-container">
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {index === 0 && 
                                               <div>
                                                 <AppBar position="static">
                                                   <Tabs value={value} onChange={this.handleChange}>
                                                     <Tab label="Existing Address" />
                                                     <Tab label="New Address" />
                                                   </Tabs>
                                                 </AppBar>
                                                 { value === 0 && 
                                                    <TabContainer>
                                                        {
                                                            this.state.addressList.length === 0 &&
                                                            <Typography>
                                                                There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                                            {index === 0 &&
                                                <div>
                                                    <AppBar position="static">
                                                        <Tabs value={value} onChange={this.handleChange}>
                                                            <Tab label="Existing Address" />
                                                            <Tab label="New Address" />
                                                        </Tabs>
                                                    </AppBar>
                                                    {value === 0 &&
                                                        <TabContainer>
                                                            {
                                                                this.state.addressList.length === 0 &&
                                                                <Typography>
                                                                    There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                                                            </Typography>
                                                        }

                                                    </TabContainer>
                                                 }
                                                 { value === 1 && 
                                                    <TabContainer>New Address</TabContainer>
                                                 }
                                               </div>
                                                            }

                                                        </TabContainer>
                                                    }
                                                    {value === 1 &&
                                                        <TabContainer>
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel htmlFor="flatnumber"> Flat / Building No.</InputLabel>
                                                                <Input id="flatnumber" type="text" flatnumber={this.state.flatBuildingNo} onChange={this.inputFlatNumberChangeHandler} />
                                                                <FormHelperText className={this.state.flatBuildingNoRequired}>
                                                                    <span className="red">required</span>
                                                                </FormHelperText>
                                                            </FormControl> <br /> <br />
                                                            <FormControl className={classes.formControl}>
                                                                <InputLabel htmlFor="locality"> Locality </InputLabel>
                                                                <Input id="locality" type="text" locality={this.state.locality} onChange={this.inputLocalityChangeHandler} />
                                                                <FormHelperText className={this.state.localityRequired}>
                                                                    <span className="red">required</span>
                                                                </FormHelperText>
                                                            </FormControl> <br /> <br />
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel htmlFor="city"> City </InputLabel>
                                                                <Input id="city" type="text" city={this.state.city} onChange={this.inputCityChangeHandler} />
                                                                <FormHelperText className={this.state.cityRequired}>
                                                                        <span className="red">required</span>
                                                                </FormHelperText>
                                                            </FormControl> <br /> <br />
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel htmlFor="state"> State</InputLabel>
                                                                <Select className={classes.select}
                                                                     open={this.state.open}
                                                                     onClose={this.handleClose}
                                                                     onOpen={this.handleOpen}
                                                                     value={this.state.state}
                                                                     onChange={this.inputStateChangeHandler}
                                                                     inputProps={{
                                                                        name: 'state',
                                                                        id: 'demo-controlled-open-select',
                                                                      }}
                                                                      MenuProps={MenuProps}
                                                                 >
                                                                    {this.state.stateList.map(state => (
                                                                        <MenuItem key={state.id} value={state.state_name}>
                                                                          {state.state_name}
                                                                        </MenuItem>
                                                                     ))}
                                                               </Select>
                                                                <FormHelperText className={this.state.stateRequired}>
                                                                     <span className="red">required</span>
                                                                </FormHelperText>
                                                            </FormControl> <br /> <br />
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel htmlFor="pincode"> Pincode </InputLabel>
                                                                <Input id="pincode" type="text" pincode={this.state.pincode} onChange={this.inputPincodeChangeHandler} />
                                                                <FormHelperText className={this.state.pincodeRequired}>
                                                                     <span className="red">required</span>
                                                                </FormHelperText>
                                                            </FormControl> <br /> <br />
                                                            <Button variant="contained" color="secondary" onClick={this.saveAddressHandler} className={classes.loginButton}> SAVE ADDRESS
                                                            </Button>
                                                        </TabContainer>
                                                    }
                                                </div>
                                            }
                                            <div className={classes.actionsContainer}>
                                                <div>