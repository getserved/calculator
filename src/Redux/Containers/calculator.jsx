import { connect } from 'react-redux'
import CalcUI from '../../Components/CalcUI'
import {getResult} from '../Action/action'

const mapStateToProps = (state) => {
    return {
        revdata: state.getRev.revdata
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        equalClick: (value) => dispatch(getResult(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalcUI);
