import React from 'react';
import travian from '../Images/travian.png'

export const Home = () => {

    return(
        <>
        <div className="container"> 
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <img src={travian} className="img-fluid rounded"/>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 text-center font10">
                Developed by Daniel. All rights reserved. Contact: voiladaniel@yahoo.com.
            </div>
        </div>
           
        </>
    )
}