import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppBoton() {
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState(0)
    useEffect(() => {fetchImage();}, []);

    const fetchImage = () => {
        setIsLoading(true);
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
        .then((response) => {
            let num = Math.round(Math.random() * 219);
            setImage(response.data.data[num].flag);
            setName(response.data.data[num].name);
            setIsLoading(false);
        })
        .catch((error) => {console.log(error); setIsLoading(false);});
    };

    const submit = () => {
        console.log(document.getElementById("input").value)
        console.log (name);
        if (document.getElementById("input").value === name) {
            setPoints(points+10)
        } else {
            setPoints(points-1)
        }
        fetchImage()
    };

    if (isLoading) {
    return (
        <div className="App">
        <h1>Cargando...</h1>
        </div>
    );
    }

    return (
        <div className="App">

            <img src={image} alt="Bandera" height={350}width={700} style={{ alignSelf: 'center' }}/>
            <p>You have {points} points</p>
            <input type="text" id="input" placeholder="Escriba el nombre del país aquí"></input>
            <button  type="submit" onClick={submit}>Enviar</button>
        </div>
    );
}