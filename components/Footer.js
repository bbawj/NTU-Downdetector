import styles from "../styles/Footer.module.css"
import React from 'react'

function Footer(){
    return (
        <footer className={styles.footer}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8 col-md-8">
                        <h6>About</h6>
                        <p className="justify-content-between">There is no centralized platform to check the status of services at NTU. Inspired by downdetector, the goal is to create a platform for real time user reports of student issues such as internet connection, printer up-time etc. This allows users to have easy access to whether a problem has occurred while also giving the relevant administrators the ability to quickly rectify a problem.</p>
                    </div>

                    <div className="col-xs-4 col-md-4">
                        <div className={styles.mainsite}>
                            <h6>Main Site</h6>
                            <ul>
                            <li><a href="#">Outage History</a></li>
                            <li><a href="#">Insights</a></li>
                            <li><a href="#">About Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>

            <hr/>

            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <p className={styles.copyright}>Copyright &copy; 2021 All Rights Reserved by NTU Downdetector</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;