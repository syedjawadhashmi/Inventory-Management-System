/**
 * Created by S jawwad hashmi on 3/4/2017.
 */
/**
 * Created by S jawwad hashmi on 1/28/2017.
 */
import React, { Component, PropTypes } from 'react'
import firebase from 'firebase';
import { Link } from 'react-router'
import { reportsActions } from '../../action/reports';
// Components
import LoginForm from '../../components/signinform/signinform'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};
const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];


const buttonStyle = { width: '100%' }
const fieldStyle = { width: '80%' }

import {browserHistory} from 'react-router';
// redux/firebase
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton'

import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';




class viewReports extends Component {


    componentDidMount() {

        this.props.getMissing()
        this.props.getPurchase()

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
    componentWillReceiveProps (nextProps) {


    }



    state = {
        finished: false,
        stepIndex: 0,
        startDate: null,
        startTime:null,
        endTime:null,
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: true,
        showRowHover: true,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: false,
        showCheckboxes: false,
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    _handleStartDate = (event, date) => {

        var currentState = this.state;
        currentState.startDate = date;
        this.setState(currentState);

    };
    _handleStartTime = (event, time) => {
        var currentState = this.state;
        currentState.startTime = time;
        this.setState(currentState);
    };
    _handleEndTime = (event, time) => {
        var currentState = this.state;
        currentState.endTime = time;
        this.setState(currentState);
    };
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    handleSubmit = () => {
        console.log(this.state)

        this.props.updatebookingSlots(this.state)
        //browserHistory.push('/signin')
    };

    handleFeedback = () => {
        console.log(this.state)


    };

    onDelete = (e) => {
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        const data ={
            slotid : this.props.params.parkingid,
            userid:this.props.auth.auth.user.uid
        }
        this.props.cancelbookingSlots(data)

    };


    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Select slots for booking...';
            case 1:
                return <DatePicker
                    hintText="Starting Date" value={this.state.startDate}  onChange={this._handleStartDate}  mode="landscape" />
            case 2:
                return  <TimePicker
                    hintText="Starting Time" value={this.state.startTime}  onChange={this._handleStartTime}
                />
            case 3:
                return <TimePicker
                    hintText="Ending Time" value={this.state.endTime}  onChange={this._handleEndTime}
                />;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    handlefinish = (data) => {


        var currentState = this.state;
        currentState.data = data;
        currentState.user=this.props.auth.auth.user.lastName,
            currentState.userid=this.props.auth.auth.user.uid,
            currentState.slotid=this.props.params.parkingid
        this.setState(currentState);


    };

    render () {

        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        let iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={this.onDelete} >cancel reservation</MenuItem>
            </IconMenu>
        );


        return (
            <div>
                <Tabs>

                    <Tab
                        label="View Stock "
                    >
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center',fontWeight:"bold"}}>
                                        Stock Details
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Product Name">Product Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Store">Store</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Type">Type</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Quantity">Quantity</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Unit Price">Unit Price</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Sales Price">Sales Price</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>

                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                            >
                                {
                                    this.props.purchase.isloaded ? this.showUsersList(this.props.purchase.purchaseData).map(user=>

                                            <TableRow>
                                                <TableRowColumn>{user.productName}</TableRowColumn>
                                                <TableRowColumn>{user.storeName}</TableRowColumn>
                                                <TableRowColumn>{user.type}</TableRowColumn>
                                                <TableRowColumn>{user.quantity}</TableRowColumn>
                                                <TableRowColumn>{user.price}</TableRowColumn>
                                                <TableRowColumn>{user.price * user.quantity }</TableRowColumn>
                                                <TableRowColumn>{user.date}</TableRowColumn>
                                            </TableRow>
                                        ) : ''

                                }

                            </TableBody>
                        </Table>
                    </Tab>
                    <Tab
                        label="View Sales"
                    >
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                                        Sales Details
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>

                                    <TableHeaderColumn tooltip="Product Name">Product Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Store">Store</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Type">Type</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Quantity">Quantity</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Unit Price">Unit Price</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Sales Price">Sales Price</TableHeaderColumn>
                               <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                            >


                                {
                                    this.props.missings.isloaded ? this.showUsersList(this.props.missings.missingData).map(user=>

                                            <TableRow>
                                                <TableRowColumn>{user.productName}</TableRowColumn>
                                                <TableRowColumn>{user.storeName}</TableRowColumn>
                                                <TableRowColumn>{user.type}</TableRowColumn>
                                                <TableRowColumn>{user.quantity}</TableRowColumn>
                                                <TableRowColumn>{user.price}</TableRowColumn>
                                                <TableRowColumn>{user.price * user.quantity }</TableRowColumn>
                                               <TableRowColumn>{user.date}</TableRowColumn>
                                            </TableRow>
                                        ) : ''

                                }

                            </TableBody>

                        </Table>
                    </Tab>
                </Tabs>
            </div>
        )
    }
    /*
     render () {

     return (
     <div>
     <h1>welcome to slots</h1>

     {
     this.props.bookings.isloaded ? this.showUsersList(this.props.bookings.bookingData).map(user =>
     <div>{user.name}</div>

     ):''
     }
     </div>
     )
     }*/
}



//=====================================
//  CONNECT
//-------------------------------------


const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state,
        missings: state.missingData,
        purchase: state.purchaseData,
        crimes: state.crimeData

    };
};

export default connect(mapStateToProps, reportsActions)(viewReports);