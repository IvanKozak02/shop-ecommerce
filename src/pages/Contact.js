import React from 'react';
import pizzaLeft from "../assets/images/pizzaLeft.jpg";

function Contact(props) {
    return (
        <div className="contact">
            <div className="left-side-contact" style={{backgroundImage:`url(${pizzaLeft})`}}>
            </div>
            <div className="right-side-contact">
                <h1>Contact us</h1>
                <form className="contact-form" action="">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Enter full name..."/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter email..."/>
                    <label htmlFor="message">Message</label>
                    <textarea rows="3" name="message" id="message" placeholder="Enter message..."/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;