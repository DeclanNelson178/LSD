import React from 'react'
import Semester from './Semester'
import Taken from './Taken'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { sems: state.sems }
}

const ConnectedSemesterList = ({ sems }) => {
    return (
        <React.Fragment>
            <Taken num={0}></Taken>
            {sems.map((item, i) => {
                return <Semester key={i} num={i+1} />
            })}
        </React.Fragment>
    )
}

const SemesterList = connect(mapStateToProps)(ConnectedSemesterList)

export default SemesterList