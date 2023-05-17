import React from "react";
import {Carousel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Gif1 from "../assets/IgniteGif.gif";
import Gif2 from "../assets/FreeCourses.gif";
import Gif3 from "../assets/Gif3.gif";
function Slider() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                   style={{marginBottom: "100px", marginTop : "20px"}}
                    className="d-block w-100"
                    src={Gif1}
                    alt="First slide"
                />

            </Carousel.Item>

                <Carousel.Item>
                    <img
                        style={{marginBottom: "100px", marginTop : "20px"}}
                        className="d-block w-100"
                        src={Gif2}
                        alt="Second Slide"
                        />
                </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{marginBottom: "100px", marginTop : "20px"}}
                    className="d-block w-100"
                    src={Gif3}
                    alt="Third Slide"
                />
            </Carousel.Item>

        </Carousel>
    );
}

export default Slider;
