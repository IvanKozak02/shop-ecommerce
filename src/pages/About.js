import React from 'react';
import multiplePizzas from '../assets/images/multiplePizzas.jpeg'
function About() {
    return (
        <div className="about">
            <div className="about-container">
                <div className="about-top" style={{backgroundImage:`url(${multiplePizzas})`}}>
                </div>
                <div className="about-bottom">
                    <h1>ABOUT US</h1>
                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda consectetur dolore dolorum eaque eos error facilis molestiae, provident quia quibusdam quos sit temporibus. Animi minus numquam quae quasi sequi.</span><span>Ab beatae blanditiis cupiditate, debitis ea esse ex harum itaque, maiores molestias optio perferendis quisquam reprehenderit rerum sed, sint vel veniam! Cum et eveniet facere iste perspiciatis ratione rerum voluptates.</span><span>Debitis delectus, earum, eos ex, illum impedit laborum nisi non quidem quod sequi soluta. Ad culpa cupiditate ducimus, enim, error iste iusto neque non odio officia totam voluptate! Magnam, sed.</span><span>Aliquid, cupiditate deleniti, eius ipsa iste nobis obcaecati odit officiis omnis porro praesentium provident quae qui reprehenderit sint tenetur veritatis! Amet blanditiis dicta dolores enim expedita facilis modi quasi quia.</span><span>Ab aliquid aperiam fuga harum impedit ipsa minus necessitatibus numquam, optio quos, saepe tempore? Amet magni nisi provident similique soluta! Asperiores error esse expedita fugiat fugit maxime neque, nobis vero?</span></p>
                </div>
            </div>
        </div>
    );
}

export default About;