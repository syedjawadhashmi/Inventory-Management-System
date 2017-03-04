/**
 * Created by S jawwad hashmi on 3/4/2017.
 */
/**
 * Created by S jawwad hashmi on 3/3/2017.
 */
import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {browserHistory} from 'react-router';
import { reportsActions } from '../../action/reports';

// Components
import SignupForm from '../../components/SignupForm/SignupForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'


class purchase extends Component {

    static propTypes = {

        addReports: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getCrime()
        this.props.getComplain()

    }
    showUsersList(users) {
        if(!users) {
            return [];
        }
        console.log(users)
        return Object.keys(users).reduce(
            (list, uid) => {
                return [
                    ...list,
                    {
                        uid,
                        ...users[uid]
                    }
                ];
            }, []);

    }
    state = {
        snackCanOpen: false,
        errors: { username: null, password: null }
    }



    reset = () =>
        this.setState({
            errors: {},
            firstName: null,
            email: null,
            lastName: null
        })

    handleSignup = (e) => {
        e.preventDefault()
        var currentState = this.state;
        currentState.userId = this.props.auth.auth.user.uid;
        currentState.role = "purchase";
        currentState.type = "purchase";
        this.setState(currentState);
        this.props.addReports(this.state)
        browserHistory.push('/'+this.props.auth.auth.user.uid);
    }

    _handleStartDate = (event, date) => {
        // var date3 = new Date();
        // var abc = date3.toString();


        var currentState = this.state;
        currentState.startDate = date;
        currentState.userId = this.props.auth.auth.user.uid;
        this.setState(currentState);

    };
    handleChange = (event, index, value) =>

        this.setState(
            {value1:value
                ,role1:event.nativeEvent.target.innerText
            });
    handleChange2 = (event, index, value) =>

        this.setState(
            {value2:value
                ,role2:event.nativeEvent.target.innerText
            });
    render () {


       // this.props.crimes.isloaded ? this.showUsersList(this.props.crimes.crimeData).map(user =>

        let allStoreData = this.props.crimes.isloaded ? Object.keys(this.props.crimes.crimeData).map((key) => { return this.props.crimes.crimeData[key] }) : {};
        if (allStoreData.length > 0) {
            var createMenusForDropDownStore = allStoreData.map((d, i) => {
                return <MenuItem key={i} value={d.storeName} primaryText={d.storeName} />
            })
        }

        let allProductData = this.props.complains.isloaded ? Object.keys(this.props.complains.complainData).map((key) => { return this.props.complains.complainData[key] }) : {};
        if (allProductData.length > 0) {

            var createMenusForDropDownProduct = allProductData.map((d, i) => {
                return <MenuItem key={i} value={d.productName} primaryText={d.productName} />
            })
        }


        return (
            <div className='Login' style={{marginLeft: '340px',marginTop: '67px',width: '50%'}}>
                <Paper className='Login-Panel'>
                    <form style={{padding: '16px',margin:'0px'}} className='LoginForm'  onSubmit={this.handleSignup}>
                        <SelectField
                            value={this.state.value1}
                            onChange={this.handleChange}
                            floatingLabelText="Store "
                            floatingLabelFixed={true}
                            hintText="Stores"
                        >
                            {createMenusForDropDownStore}
                        </SelectField>

                        <SelectField
                                value={this.state.value2}
                                onChange={this.handleChange2}
                                floatingLabelText="Product"
                                floatingLabelFixed={true}
                                hintText="Products"
                            >
                            {createMenusForDropDownProduct}
                        </SelectField>
                        <DatePicker
                            hintText="Purchase Date" value={this.state.startDate}  onChange={this._handleStartDate}  mode="landscape" />

                        <TextField
                            hintText='Quantity'
                            floatingLabelText='Quantity'
                            onChange={({ target }) => { this.setState({quantity: target.value}) }}
                            style={fieldStyle}/>
                        <TextField
                            hintText='Unit Price'
                            floatingLabelText='Unit Price'
                            onChange={({ target }) => { this.setState({price: target.value}) }}
                            style={fieldStyle}/>




                        <div className='LoginForm-Submit'>
                            <RaisedButton
                                label='Add Purchase'
                                primary
                                type='submit'
                                style={buttonStyle}
                            />
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }



}

const mapStateToProps = (state) => {
    //console.log(state)
    return { auth: state ,
        crimes: state.crimeData,
        complains: state.complainData
    };
};
//=====================================
//  CONNECT
//-------------------------------------

export default connect(mapStateToProps, reportsActions)(purchase);