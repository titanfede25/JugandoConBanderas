import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppBoton() {
const [isLoading, setIsLoading] = useState(true);
const [dogImage, setDogImage] = useState('');

useEffect(() => {
fetchDogImage();
}, []);

const fetchDogImage = () => {
setIsLoading(true);
axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
    .then((response) => {
    let num = Math.round(Math.random() * 219);
    setDogImage(response.data.data[num].flag);
    setIsLoading(false);
    })
    .catch((error) => {
    console.log(error);
    setIsLoading(false);
    });
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
    <img src={dogImage} alt="Un perro" />
    <p>{dogImage}</p>
    <button onClick={fetchDogImage}>Cambiar imagen</button>
</div>
);
}