import Header from "./Header";
// import '../resources/';
// import absolute_curve from '../resources';
import '../sheets/About.css';

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function About({darkmode, toggleDarkmode}:SearchProps)
{

    const dark = darkmode ? 'darkmode_about' : '';
    const link = !darkmode ? 'link_about' : '';

    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
            <div className="spacer_about">
                <div className={`content_about ${dark}`}>

                    <h3 className={`sub`}>Creator</h3>
                    <p className={`subsub`}>
                        This program is created by Anders Stubberud,
                        an eager cyclist and second year computer science student
                        at <a className={`${link} ${dark}`} href="https://www.ntnu.edu/" target="_blank">NTNU</a>.
                    </p>
        
                    <h3 className={`sub`}>Limitations in precision</h3>
                    <h4 className={`sub`}>Estimating wattage</h4>
                    <p className={`subsub`}>
                        Since the Strava API v3 does not provide wattage for the KOM of a given segment, 
                        i had to make a script for calculating it based on the metrics which are provided. 
                        The relevant metrics for this calculation were time, distance, and average gradient. 
                        (The script also has a function for determining air density based on elevation and temperature, 
                        but this has not yet been implemented into the estimation of wattage; currently, 
                        a constant is used for air density.)
                        From there, textbook formulas has been used to determine the wattage.
                        Since the calculation assumes linearity in the gradient, 
                        it is not entirely accurate, yet it provides an estimation.
                    </p>
                    <h4 className={`sub`}>Determining relative percentage</h4>
                    <p className={`subsub`}>
                        Comparison of segments requires a way to compare the KOM's based on 2 variables;
                        duration and wattage. In order to establish a foundation for comparison based on 
                        these metrics, this program applies the provided metrics to a model based on the dataset
                        of the power curve created by <a
                        href="https://www.cyclinganalytics.com/blog/2018/06/how-does-your-cycling-power-output-compare" 
                        target="_blank"
                        className={`${link} ${dark}`}
                        >cycling analytics</a>, yielding a relative percentage. 
                        The segments are compared based on this relative percentage. 
                        Cycling analytics does not provide programatically access 
                        to all the data making up the powercurve. They have however published a 
                        smaller dataset, which contains the data on selected entries.
                        In an attempt to more precisely replicate the full power curve, the dataset
                        used in this program is created from a <a 
                        className={`${link} ${dark}`}
                        href="https://github.com/Anders-Stubberud/KOMpanion/blob/main/backend/create_power_curve.py" target="_blank"
                        >linear regression</a> on the smaller dataset,
                        thus providing a more precise representation of the relative effort than the smaller dataset, 
                        yet not as precise as the dataset making up the powercurve. 
                    </p>
                    <div className={'powercurves subsub'}>
                        <div className="curves">
                            <img className="images" src={process.env.PUBLIC_URL + '/images/absolute_curve.PNG'} 
                            alt="absolute wattage curve" />
                            <em>absolute power curve</em>
                        </div>
                        <div className="curves">
                            <img className="images" src={process.env.PUBLIC_URL + '/images/relative_curve.PNG'} 
                            alt="relative wattage curve" />
                            <em>realtive power curve</em>
                        </div>
                    </div>

                    <h3 className={`sub`}>Technical overview</h3>
                    <p className={`subsub`}>
                        All code for this program is available in <a 
                        className={`${link} ${dark}`}
                        href="https://github.com/Anders-Stubberud/KOMpanion/tree/main" target="_blank">this github repo</a>.
                        <br></br>
                        The techstack consists of python on the backend, flask for the API, and react on the frontend.
                    </p>
                </div>
            </div>
            <br></br><br></br><br></br><br></br>
        </div>
    );
}

export default About;