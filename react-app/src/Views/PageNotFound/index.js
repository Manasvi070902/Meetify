import React from 'react'
import errorpic from "../../Assets/error.svg"
import { Button } from 'react-bootstrap'

 const PageNotFound = () => {
    return (
        <div className="col-lg-10 d-flex col-12 align-items-center justify-content-center " style={{height : "100vh"}}>
        <img className="img-fluid mx-auto d-block rounded w-50" src={errorpic} alt="pic"/>
        <Button className="p-2  d-block justify-content-center " variant="info" onClick={() => {window.open(`/`)}} >Back to Home!</Button> 
       
        </div>
    )
}
export default PageNotFound
