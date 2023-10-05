import Header from "./Header";
import '../sheets/About.css';
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Highlight } from '@chakra-ui/react'

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function About({darkmode, toggleDarkmode}:SearchProps)
{

    const dark = darkmode ? 'darkmode_about' : 'not_darkmode_about';
    const link = !darkmode ? 'link_about' : 'link_darkmode';
    const t = darkmode ? 'transition_about'  : '';

    return (
        <div className="main_about">
            <div className="inner_about">
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
                <div className={`content_about ${dark} ${t}`}>

                    <Heading as='h3' size='lg' className={`sub`}>Creator</Heading>
                    <Text className={`subsub`} fontSize='sm'>
                        This program is created by Anders Stubberud,
                        an eager cyclist and second year computer science student
                        at <a className={`${link} ${dark} ${t}`} href="https://www.ntnu.edu/" target="_blank">NTNU</a>.
                    </Text>

                    <Heading as='h3' size='lg' className={`sub`}>Functionality</Heading>
                    <Text className={`subsub`} fontSize='sm'>
                        The core purpose of KOMpanion is to showcase the most achievable <a 
                        className={`${link} ${dark} ${t}`} 
                        href="https://support.strava.com/hc/en-us/articles/216917137-What-s-a-segment-" 
                        target="_blank">strava segments</a> for a given location.
                        Briefly explained, strava segments are designated portions of a route where cyclists can 
                        track their performance and compete with others. Users' activities on segments are timed
                        and displayed on a public leaderboard, creating a competitive aspect.
                        Many strava users want to be at the top of the leaderboard of various segments,
                        earning them the title of the "KOM" of the given segment.
                        Choosing the path of least resistance is a reasonable choice in this situation,
                        however, it raises the question of which segment is the most achievable.
                        This is the question KOMpanion is developed to give a concrete answer to.
                        <br></br>
                        Once KOMpanion is provided with a location and a radius, it fetches data on the segments 
                        within the given area by using the strava API.
                        From there, a python script assigns each segment a relative percentage of difficuly
                        by using the wattage and duration of the current KOM as inputs in a dataset.
                        Finally, the segments are sorted based on the relative percentage, and displayed to the user.
                    </Text>
        
                    <Heading as='h3' size='lg' className={`sub`}>Limitations in precision</Heading>
                    <Heading as='h4' size='md' className={`sub`}>Estimating wattage</Heading>
                    <Text className={`subsub`} fontSize='sm'>
                        Since the Strava API v3 does not provide wattage for the KOM of a given segment, 
                        I had to make a script for calculating it based on the metrics which are provided. 
                        The relevant metrics for this calculation were time, distance, and average gradient. 
                        (The script also has a function for determining air density based on elevation and temperature, 
                        but this has not yet been implemented into the estimation of wattage; currently, 
                        a constant is used for air density.)
                        From there, textbook formulas has been used to determine the wattage.
                        Since the calculation assumes linearity in the gradient, 
                        it is not entirely accurate, yet it provides an estimation.
                    </Text>
                    <Heading as='h4' size='md' className={`sub`}>Determining relative percentage</Heading>
                    <Text className={`subsub`} fontSize='sm'>
                        Comparison of segments requires a way to compare the KOM's based on 2 variables;
                        duration and wattage. In order to establish a foundation for comparison based on 
                        these metrics, this program applies the provided metrics to a model based on the dataset
                        of the power curve created by <a
                        href="https://www.cyclinganalytics.com/blog/2018/06/how-does-your-cycling-power-output-compare" 
                        target="_blank"
                        className={`${link} ${dark} ${t}`}
                        >cycling analytics</a>, yielding a relative percentage. 
                        The segments are compared based on this relative percentage. 
                        Unfortunately, cycling analytics does not provide programmatic access 
                        to all the data making up the powercurve. They have however published a 
                        smaller dataset, which contains the data on selected entries.
                        In an attempt to more precisely replicate the full power curve, the dataset
                        used in this program is created from a <a 
                        className={`${link} ${dark} ${t}`}
                        href="https://github.com/Anders-Stubberud/KOMpanion/blob/main/backend/create_power_curve.py" target="_blank"
                        >linear interpolation</a> on the smaller dataset.
                        Thus, while this approach offers a reasonable estimation of the full power curve based on 
                        the available data, it's important to recognize that it simplifies the complexity. 
                        As a result, the model generated by this method serves as a 
                        valuable tool for relative comparisons of segments, even though it does not capture the 
                        nuances of the full power curve.
                    </Text>
                    <div className={'powercurves subsub'}>
                        <div className="curves">
                            <img className="images" src={process.env.PUBLIC_URL + '/images/absolute_curve.PNG'} 
                            alt="absolute wattage curve" />
                            <em>absolute power curve</em>
                        </div>
                        <div className="curves">
                            <img className="images" src={process.env.PUBLIC_URL + '/images/relative_curve.PNG'} 
                            alt="relative wattage curve" />
                            <em>relative power curve</em>
                        </div>
                    </div>
                    
                    <Heading as='h3' size='lg' className={`sub`}>Technical overview</Heading>
                    <Text className="subsub bottom" fontSize='sm'>
                        All code for this program is available in <a 
                        className={`${link} ${dark} ${t}`}
                        href="https://github.com/Anders-Stubberud/KOMpanion/tree/main" target="_blank">this github repo</a>.
                        <br></br>
                        The techstack consists of python on the backend, flask for the API, and react on the frontend.
                    </Text>
                </div>
            </div>
            <br></br><br></br><br></br><br></br>
        </div>
    );
}

export default About;