import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importing the envelope (message) icon
import './css/header.css'
const Header = () => {
    return (
        <header className="custom-header"> {/* Added a custom class for styling */}
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">My Application</a>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/link2">
                                <FontAwesomeIcon icon={faUser} /> {/* User icon */}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/message">
                                <FontAwesomeIcon icon={faEnvelope} /> {/* Message icon */}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
