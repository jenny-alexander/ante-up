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
                        <div></div>
                        <div>Lessons learned from this challenge:
                            <ul className="lessons-learned-list">
                                <li>Manage state as close to the component using it as possible.</li>
                                <li>Writing your own CSS allows you better control over styling and gives lots of practice using grid and flexbox.</li>
                                <li>Real users give the best feedback.</li>
                            </ul>
                        </div>

                    </div>              
                </div>
                <div className="about-tech-used">
                    <div className="about-tech-text">Built on PERN stack:</div>
                    <div className="image-container" key={techStack.key}>
                        {techStack.map(tech => {
                                return (<img src={`/images/about/${tech.name}.png`}/>)
                        })}
                    </div>
                </div>
                <div className="about-lang-used">
                    <div className="about-language-text">Languages Used:</div>
                    <div className="image-container" key={languages.key}>
                        {languages.map(language => {
                                return (<img src={`/images/about/${language.name}.png`}/>)
                        })}
                    </div>
                </div>
                <div className="about-other-used">
                    <div className="about-other-text">Other libraries/tools/extensions:</div>
                    <div className="image-container" key={other.key}>
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