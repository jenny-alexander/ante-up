import { React } from 'react';
import Card from '../Common/Card/Card';
import './About.scss';

function About(props) {

    const techStack = [
        { name: 'postgresql', key: crypto.randomUUID() },
        { name: 'express', key: crypto.randomUUID() },
        { name: 'react', key: crypto.randomUUID() },
        { name: 'nodejs', key: crypto.randomUUID() },
      ];
      const languages = [
        { name: 'html', key: crypto.randomUUID() },
        { name: 'css', key: crypto.randomUUID() },
        { name: 'js', key: crypto.randomUUID() },
      ];
      const other = [
        { name: 'redux', key: crypto.randomUUID() },
        { name: 'sass', key: crypto.randomUUID() },
        { name: 'git', key: crypto.randomUUID() },
        { name: 'vscode', key: crypto.randomUUID() },
      ];

    const AboutDetails = () => {
        return (
            <>
                <div className="about-description">
                    <p>I developed this application so my kids could keep track of their allowances and chores. </p>  
                    <div className="about-takeaway">                        
                        <div>Lessons learned from this challenge:
                            <ul className="lessons-learned-list">
                                <li>Manage state as close to the component using it as possible.</li>
                                <li>Writing your own CSS allows you better control over styling.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="about-upnext">                        
                        <div>Take-away:
                            <ul className="lessons-learned-list">
                                <li>Future apps should use CSS Modules to prevent selector name collisions.</li>
                            </ul>
                        </div>
                    </div>           
                </div>
                <div className="about-used">
                    <div className="about-text">Built on PERN stack:</div>
                    <div className="image-container stack" key={techStack.key}>
                        {techStack.map(tech => {
                                return (<img src={`/images/about/${tech.name}.png`}/>)
                        })}
                    </div>
                </div>
                <div className="about-used">
                    <div className="about-text">Languages Used:</div>
                    <div className="image-container" key={languages.key}>
                        {languages.map(language => {
                                return (<img src={`/images/about/${language.name}.png`}/>)
                        })}
                    </div>
                </div>
                <div className="about-used">
                    <div className="about-text">Other libraries/tools/extensions:</div>
                    <div className="image-container languages" key={other.key}>
                        {other.map(other => {
                                return (<img src={`/images/about/${other.name}.png`}/>)
                        })}
                    </div>
                </div>
            </>
        )
    }
    return (
    <div className='about'>
        <div className='about-container'>
            <h1 className="about-title">About Ante Up</h1>
            <Card component={<AboutDetails />} className="about-component" />                   
        </div>
    </div>
    )
}

export default About;