/**
 * Created by S jawwad hashmi on 3/4/2017.
 */
import {
    GET_PURCHASE_PROCESS_ERROR,
    GET_PURCHASE_PROCESS_SUCCESS ,
    GET_PURCHASE_PROCESS
} from '../../action/reports';


const InitalState = {
    isloaded:false,
    isProcessing:false,
    purchaseData: null
};

export const purchaseReducer = function (state = InitalState, action) {

    switch (action.type) {

        case GET_PURCHASE_PROCESS:
            return Object.assign({}, state, { isProcessing: true });
        case GET_PURCHASE_PROCESS_SUCCESS:
            return Object.assign({}, state, { isloaded: true, purchaseData: action.payload });



        default:
            return state;
    }
}

