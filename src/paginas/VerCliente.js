import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../componentes/Spinner';

function VerCliente() {
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)


    const {id} = useParams();

    useEffect(() => {
        //setCargando(!cargando)
        const obtenerClienteAPI = async () =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url);
                const resultado = await respuesta.json()
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
           
                setCargando(!cargando);
            
        }
        obtenerClienteAPI();
    }, [])
        
  return (

    cargando ? <Spinner/>: 
        Object.keys(cliente).length === 0 ?
        <p>No hay Resultados</p> : 
        
        ( 
    

            <div>
            
                    <>
                        {/* <h1 className='font-black text-4xl text-blue-900'>Cliente: {cliente.nombre}</h1> */}
                        <p className='mt-3 font-medium text-2xl mb-5'>Información del Cliente</p>

                        

                        {cliente.nombre && (
                        <p className='text-2xl text-gray-700'>
                        <span className='text-gray-600 uppercase font-bold'>Cliente: </span>
                            {cliente.nombre}
                            </p>
                        )}
                    

                        {cliente.email && (
                            <p className='text-2xl text-gray-700 mt-4'>
                            <span className='text-gray-600 uppercase font-bold'>Email: </span>
                                {cliente.email}
                            </p>
                        )}
                    

                        {cliente.telefono && (
                        <p className='text-2xl text-gray-700 mt-4'>
                        <span className='text-gray-600 uppercase font-bold'>Teléfono: </span>
                            {cliente.telefono}
                            </p>
                        )}
                    
                        {cliente.empresa && (
                            <p className='text-2xl text-gray-700 mt-4'>
                            <span className='text-gray-600 uppercase font-bold'>Empresa: </span>
                                {cliente.empresa}
                            </p>
                        )}

                        

                        {cliente.notas && (
                            <p className='text-2xl text-gray-700 mt-4'>
                                <span className='text-gray-600 uppercase font-bold'>Notas: </span>
                                {cliente.notas}
                            </p>
                        )}
                    </>
          </div>
        )
  )
}

export default VerCliente