"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Cargar datos desde localStorage al iniciar
    const storedData = localStorage.getItem('sensorData');
    if (storedData) {
      setSensorData(JSON.parse(storedData));
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/diego162002/nextjs-dashboard/contents/app/dashboard/data.json?timestamp=${Date.now()}`);
        const data = await response.json();
        const decodedData = atob(data.content); // Decode base64 data from GitHub
        const jsonData = JSON.parse(decodedData);

        // Crear un nuevo dato
        const newSensorData = { id: sensorData.length + 1, name: 'Sensor MQ', value: jsonData["Data MQ"] };
        
        // Actualizar el estado con el nuevo dato
        const updatedData = [...sensorData, newSensorData];
        setSensorData(updatedData);

        // Guardar en localStorage
        localStorage.setItem('sensorData', JSON.stringify(updatedData));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch initial data
  }, []);

  return (
    {/* Imagen del sensor MQ */}
      <div className="flex justify-center mb-4">
        <img
          src="https://naylampmechatronics.com/img/cms/Blog/Tutorial%20MQ/sensor%20MQ.jpg" // Reemplaza con la ruta de tu imagen
          alt="Sensor MQ"
          className="w-24 h-24"
        />
    <div
      style={{
        backgroundImage: "url('https://www.vistronica.com/20905-large_default/modulo-sensor-de-deteccion-de-gas-mq-2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <h1 className="text-center text-2xl font-bold mb-4 text-white">Datos del Sensor</h1>
      <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg p-4 mx-auto max-w-3xl">
        <table className="min-w-full bg-white border border-blue-300">
          <thead>
            <tr className="bg-blue-200 text-blue-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Valor</th>
            </tr>
          </thead>
          <tbody className="text-blue-600 text-sm font-light">
            {sensorData.map((sensor, index) => (
              <tr key={index} className="border-b border-blue-200 hover:bg-blue-100">
                <td className="py-3 px-6">{sensor.id}</td>
                <td className="py-3 px-6">{sensor.name}</td>
                <td className="py-3 px-6">{sensor.value} ppm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
