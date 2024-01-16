import React from 'react';
import {Instagram} from "@mui/icons-material";
import {Facebook} from "@mui/icons-material";
import {LinkedIn} from "@mui/icons-material";
import {Twitter} from "@mui/icons-material"
import '../App.css'
function Footer(props) {
    return (
        <footer className="footer">
            <div className="social-media">
                <Instagram/>
                <Facebook/>
                <Twitter/>
                <LinkedIn/>
            </div>
            <p>&copy; 2023 Ivanos@Kozakos</p>
        </footer>
    );
}

export default Footer;