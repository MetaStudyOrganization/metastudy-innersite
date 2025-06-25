import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import forHire from '../../assets/pictures/forHireGif.gif';
import { useLocation, useNavigate } from 'react-router';
import background from '../../assets/pictures/backgroundRpg.jpg';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = () => {
    const location = useLocation();
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [isHome, setIsHome] = useState(false);

    const navigate = useNavigate();
    const goToContact = () => {
        navigate('/contact');
    };

    useEffect(() => {
        if (location.pathname.includes('/projects')) {
            setProjectsExpanded(true);
        } else {
            setProjectsExpanded(false);
        }
        setIsHome(location.pathname === '/');
    }, [location.pathname]);

    if (isHome) return null;

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
            }}
            className=" h-full w-[400px] flex flex-col p-12 "
        >
            <div className="flex flex-col mb-16">
                <h1 className="text-4xl leading-none">Henry</h1>
                <h1 className="text-4xl leading-none">Heffernan</h1>
                <h3 className="mt-3">Showcase '22</h3>
            </div>
            <div className="flex flex-col flex-1 justify-center">
                <Link to="" text="HOME" />
                <Link to="studyrooms" text="STUDYROOMS" />
                <Link to="mystudyrooms" text="MYSTUDYROOMS" />
                <Link to="projects" text="PROJECTS" />
                {projectsExpanded && (
                    <div className="flex flex-col ml-8 mb-4">
                        <Link to="projects/software" text="SOFTWARE" />
                        <Link to="projects/music" text="MUSIC" />
                        <Link to="projects/art" text="ART" />
                    </div>
                )}
                <Link to="contact" text="CONTACT" />
            </div>
            <div className="flex-1" />
            <div className="cursor-pointer w-full" onMouseDown={goToContact}>
                {/* <img src={forHire} className="w-4/5" alt="for hire" /> */}
            </div>
        </div>
    );
};

export default VerticalNavbar;
