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
axios.get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
    setDogImage(response.data.message);
    setIsLoading(false);
    })
    .catch((error) => {
    console.log(error);
    setIsLoading(false);
    });
};

const handleButtonClick = () => {
fetchDogImage();
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
    <button onClick={handleButtonClick}>Cambiar imagen</button>
</div>
);
}