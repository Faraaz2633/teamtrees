import React from 'react'
import NavbarExample from "./Navbar"

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import Spinner1 from '../../../components/Spinner/Spinner1';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import Projects from './Projects';

const Main = ({dataAbout, dataEdu, dataExp, dataProj, dataSocial}) => {
    if(!isLoaded(dataSocial)) return <Spinner1 />
    // console.log(dataAbout, dataEdu, dataExp, dataProj, dataSocial)
    console.log(dataSocial)
    return (
        <>
        <NavbarExample info={dataAbout} />

        <div className="container">
        <About info={dataAbout} social={dataSocial} />
        <Education info={dataEdu}/>
        <Experience info={dataExp}/>
        <Projects info={dataProj}/>
        </div>        

        </>
    )
}

const mapStateToProps = (state) => {
    //   console.log(state);
    const dataAbout = state.firestore.ordered.about;
    const dataEdu  = state.firestore.ordered.edu;
    const dataExp  = state.firestore.ordered.exp;
    const dataProj  = state.firestore.ordered.proj;
    const dataSocial  = state.firestore.ordered.social;

    const uid = state.firebase.auth.uid;
    return {
      dataAbout,
      dataEdu,
      dataExp,
      dataProj,
      dataSocial,
      uid,
    };
  };

  export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
      {
        collection: "about",
        where: ["authorID", "==", ownProps.uid],
        orderBy: ["date", "desc"],
      },
      {
        collection: "edu",
        where: ["authorID", "==", ownProps.uid],
        orderBy: ["date", "desc"],
      },{
        collection: "exp",
        where: ["authorID", "==", ownProps.uid],
        orderBy: ["date", "desc"],
      },
      {
        collection: "proj",
        where: ["authorID", "==", ownProps.uid],
        orderBy: ["date", "desc"],
      },
      {
        collection: "social",
        where: ["authorID", "==", ownProps.uid],
        orderBy: ["date", "desc"],
      },
    ])
  )(Main);
