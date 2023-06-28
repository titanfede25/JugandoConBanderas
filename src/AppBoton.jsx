import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function AppBoton() {
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState(0)
    const [message, setMessage] = useState('')
    useEffect(() => {fetchImage();}, []);

    const fetchImage = () => {
        setIsLoading(true);
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
        .then((response) => {
            let num = Math.round(Math.random() * 219);
            setImage(response.data.data[num].flag);
            console.log(response.data.data[num].name);
            setName(response.data.data[num].name.toUpperCase());
            setIsLoading(false);
        })
        .catch((error) => {console.log(error); setIsLoading(false);});
    };

    const submit = () => {
        if(document.getElementById("input").value.length == 0){
            alert("Error: The field should not be empty")
        }
        else{
            if (document.getElementById("input").value.toUpperCase() === name) {
                setPoints(points+10);
                setMessage("You have earned 10 points!")

            } else {
                setPoints(points-1)
                setMessage("You have lost 1 point!")
            }
            fetchImage()
        }
    };

    if (isLoading) {
    return (
        <div className="Fondo">
        <h1>Cargando...</h1>
        </div>
    );
    }

    return (
        <div className="Fondo">
            <img src={image} alt="Bandera" height={350}width={700}/>
            <p>{message}</p>
            <p>Points: {points}</p>
            <div className='Input'>
            <input type="text" id="input" placeholder="Escriba el nombre del país aquí" ></input>
            </div>
            <div className='button'>
            <button  type="submit" onClick={submit}>Enviar</button>
            </div>
        </div>
    );
}