import React from "react";
import './Footer.css'
function Footer() {
    return (
        <div className="footer">
            <div className="row">
                <div className="col-md-4 col-xs-12">
                    <div style={{ display: 'flex', flexFlow: 'column', flexDirection: "column" }}>
                        <h2 style={{ color: 'rgb(255,255,255,0.4)' }}>Library</h2>
                        <p>Genres</p>
                        <p>Library</p>
                        <p>Authors</p>
                    </div>
                </div>
                <div className="col-md-4 col-xs-12">
                    <div style={{ display: 'flex', flexFlow: 'column', flexDirection: "column" }}>
                        <h2 style={{ color: 'rgb(255,255,255,0.4)' }}>Community</h2>
                        <p>Articles</p>
                        <p>Author Interviews</p>
                        <p>News Letters</p>
                    </div>
                </div>
                <div className="col-md-4 col-xs-12">
                    <div style={{ display: 'flex', flexFlow: 'column', flexDirection: "column" }}>
                        <h2 style={{ color: 'rgb(255,255,255,0.4)' }}>Follow</h2>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-xs-8" style={{ color: 'white' }}>coded and designed by - mayurnagdev123</div>
                <div className="col-xs-4" style={{ color: 'white' }}> Terms and Privacy</div>
            </div>

        </div >
    )


}
export default Footer;