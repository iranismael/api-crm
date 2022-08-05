import React from 'react'
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Alerts } from './Alerts';
import Spinner from './Spinner';

function Formulario({cliente, cargando}) {


    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({

        nombre: Yup.string()
                            .min(3,'El nombre es muy corto')
                            .required('Nombre del cliente es bligatorio'),
        empresa: Yup.string()
                            .required('Nombre de la empresa es obligatorio'),
        email: Yup.string()
                            .email('Correo no válido')
                            .required('Correo es obligatorio'),
        telefono: Yup.number()
                            .positive('El numero no válido')
                            .integer('Número no válido')
                            .typeError('El número no es válido'),
                


    });

    const handleSubmit = async (valores) =>{
       try {
        let respuesta;
        if(cliente.id){
            console.log("Editando....");
            const url = `http://localhost:4000/clientes/${cliente.id}`;
             respuesta = await fetch(url,{
                method: 'PUT', //
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
        }else{
            console.log("Agregando....");
            const url = 'http://localhost:4000/clientes';
             respuesta = await fetch(url,{
                method: 'POST', //Crear un nuevo registro
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            
        }

        //console.log(respuesta);
        const resultado = await respuesta.json();
        //console.log(resultado);
        navigate('/clientes');

       } catch (error) {
        console.log(error); 
       }

    }

  return (

    cargando ? <Spinner /> : (

        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold  text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente.nombre ? cliente.nombre : "",
                    empresa:cliente.empresa ? cliente.empresa : "",
                    email:cliente.email ? cliente.email : "",
                    telefono:cliente.telefono ? cliente.telefono : "",
                    notas:cliente.notas ? cliente.notas : ""

                }}
                enableReinitialize={true}
                onSubmit={async(values, {resetForm})=>{ 
                    await handleSubmit(values);
                    resetForm()
                }}
                validationSchema = {nuevoClienteSchema}
            >
            
                {({errors, touched}) => {
                    //console.log(touched);
                return (

                <Form
                    className='mt-10 '
                >
                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre</label>
                        <Field
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del cliente"
                            name="nombre"

                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerts>{errors.nombre}</Alerts>
                            ) : null }
                        

                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa</label>
                        <Field
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del cliente"
                            name="empresa"

                        />
                        {errors.empresa && touched.empresa ? (
                            <Alerts>{errors.empresa}</Alerts>
                        ) : null }
                        
                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='email'
                        >Email</label>
                        <Field
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del cliente"
                            name="email"
                        />
                        {errors.email && touched.email ? (
                            <Alerts>{errors.email}</Alerts>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Telefono</label>
                        <Field
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del cliente"
                            name="telefono"
                        />
                        {errors.telefono && touched.telefono ? (
                            <Alerts>{errors.telefono}</Alerts>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas</label>
                        <Field
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del cliente"
                            name="notas"
                        />
                        {errors.notas && touched.notas ? (
                            <Alerts>{errors.notas}</Alerts>
                        ) : null }
                    </div>

                    <input 
                        type="submit" 
                        value={cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'>

                    </input>
                
                </Form>
                )}} 
            
            </Formik>
        </div>
    )
    
  )
}

Formulario.defaultProps = {
    cliente:{},
    cargando:false
}

export default Formulario