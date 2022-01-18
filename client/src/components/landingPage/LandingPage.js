import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'
import img1 from "../../assets/fondolanding.jpg"
import  img2  from "../../assets/anh-nguyen-_Uqj5BQb-mw-unsplash.jpg";
import img3 from "../../assets/hamza-nouasria-SzJo-8Q5iD4-unsplash.jpg";
import  img4  from "../../assets/gustavo-sanchez-pCney1f3G_A-unsplash.jpg";
import { ReactComponent as LeftArrow } from "../../assets/iconmonstr-angel-left-thin.svg";
import { ReactComponent as RightArrow } from "../../assets/iconmonstr-angel-right-thin.svg";
import styled from "styled-components";
import NavBar from "../navBar/NavBar";

export default function LandingPage() {

  const slideshow = useRef(null);
  const intervalSlideshow = useRef(null);

  const next = () => {
    //Comprobamos que el slideshow tenga elementos
    if (slideshow.current.children.length > 0) {
      console.log(next);
      //Obtenemos el primer elemento del slideshow.
      const firstElement = slideshow.current.children[0];

      //Establecemos la transición para el slideshow.
      slideshow.current.style.transition = `300ms ease-out all`;

      const sizeSlide = slideshow.current.children[0].offsetWidth;

      //Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      const transition = () => {
        //Reiniciamos la posición del Slideshow.
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        //Tomamos el primer elemento y lo mandamos al final.
        slideshow.current.appendChild(firstElement);

        slideshow.current.removeEventListener('transitionend', transition)
      }

      //Eventlistener para cuando termina la animación.
      slideshow.current.addEventListener('transitionend', transition);

    }
  };

  const prev = () => {
    if(slideshow.current.children.length > 0) {
      //Obtenemos el último elemento del slideshow.
      const index = slideshow.current.children.length - 1;
      const lastElement = slideshow.current.children[index];
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);

      slideshow.current.style.transition = 'none';
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = '300ms ease-out all';
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    intervalSlideshow.current = setInterval(() => {
      next();
    }, 5000);

    //Eliminamos los intervalos
    slideshow.current.addEventListener('mouseenter', () => {
      clearInterval(intervalSlideshow.current);
    });

    //Volvemos a poner el intervalo cuando saquen el cursor del slideshow
    slideshow.current.addEventListener('mouseleave', () => {
      intervalSlideshow.current = setInterval(() => {
        next();
      }, 5000);
    });
  }, []);



  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <MainContainer>
      <SlideshowContainer ref={slideshow}>
        <Slide>
          <a href="#">
            <img src={img1} alt="" />
          </a>
          <TextSlide>
            <p>Más de 5000 recetas disponibles</p>
          </TextSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img2} alt="" />
          </a>
          <TextSlide>
            <p>Más de 5000 recetas disponibles</p>
          </TextSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img3} alt="" />
          </a>
          <TextSlide>
            <p>Más de 5000 recetas disponibles</p>
          </TextSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img4} alt="" />
          </a>
          <TextSlide>
            <p>Más de 5000 recetas disponibles</p>
          </TextSlide>
        </Slide>
      </SlideshowContainer>
      <Controls>
        <Button onClick={prev}>
          <LeftArrow />
        </Button>
        <Button right onClick={next}>
          <RightArrow />
        </Button>
      </Controls>
    </MainContainer>
    </div>
  );
}

const MainContainer = styled.div`
  position: relative;
`;

const SlideshowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 10;
  max-height: 768px;
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextSlide = styled.div`
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgba(0,0,0,.3)"};
  color: ${(props) => (props.textColor ? props.textColor : "#fff")};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Button = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;
  /* &:hover {
    background: rgba(0,0,0,.2);
    path {
      fill: #fff;
    }
  } */

  path {
    filter: ${(props) =>
      props.right
        ? "drop-shadow(-2px 0px 0px #fff)"
        : "drop-shadow(2px 0px 0px #fff)"};
  }

  ${(props) => (props.right ? "right: 0" : "left: 0")}
`;