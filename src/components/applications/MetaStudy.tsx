import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../chrome/Home';
import Window from '../os/Window';
import MyStudyrooms from '../chrome/MyStudyrooms';
import Projects from '../chrome/Projects';
import Contact from '../chrome/Contact';
import SoftwareProjects from '../chrome/projects/Software';
import MusicProjects from '../chrome/projects/Music';
import ArtProjects from '../chrome/projects/Art';
import VerticalNavbar from '../chrome/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import StudyRooms from '../chrome/StudyRooms';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="MetaStudy"
            windowBarIcon="chrome"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2025 MetaStudy'}
        >
            <Router>
                <div className="site-page">
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/studyrooms" element={<StudyRooms />} />
                        <Route
                            path="/mystudyrooms"
                            element={<MyStudyrooms />}
                        />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/projects/software"
                            element={<SoftwareProjects />}
                        />
                        <Route
                            path="/projects/music"
                            element={<MusicProjects />}
                        />
                        <Route path="/projects/art" element={<ArtProjects />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
