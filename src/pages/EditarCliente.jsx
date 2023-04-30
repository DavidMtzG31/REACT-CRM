import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";

import { obtenerClienteEditar } from "../data/clientes";
import Formulario from '../components/Formulario';
import Error from "../components/Error";

import { actualizarCliente } from "../data/clientes";

export async function loader( {params} ) {

  const cliente = await obtenerClienteEditar(params.clienteId);

  if( Object.values(cliente).length === 0) {
    throw new Response('',{
      status: 404,
      statusText: 'No hay resultados de un cliente con el Id proporcionado'
    })
  }

  return cliente;
}

export async function action( {request, params} ) {

    console.log(params)

    const formData = await request.formData();

    const datos = Object.fromEntries(formData);

    const email = formData.get('email');

    // Validación al Form
    const errores = [];
    if( Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    // Validando el campo email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if( !regex.test(email) ) {
        errores.push('El email no es válido');
    }

    // Retornar los errores
    if(Object.keys(errores).length) {
        return errores;
    }


    // Actualizar cliente
    await actualizarCliente(params.clienteId, datos); /* Pasando los datos de los clientes hacia data > clientes */

    return redirect('/');
}

function EditarCliente() {

  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p>Modifica los datos del cliente</p>

        <div className="flex justify-end">
              <button
                  className="bg-blue-800 text-white px-5 py-1 font-bold uppercase"
                  onClick = { () => {
                      navigate('/');
                  } }
              >
                  Volver
              </button>
        </div>

        <div className="bg-white shadiw rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

              {errores?.length && errores.map( (error, i) => {
                return (
                  <Error
                      key={i}
                  >
                      {error}
                  </Error>
                )

              } )}
              <Form 
                  method="POST"
                  noValidate
              >  {/* Form viene de router-dom para gestionar el POST */}

                  <Formulario 
                    cliente = {cliente}
                  /> 

                  <input
                      type="submit"
                      className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer hover:bg-blue-950 transition duration-200 ease-in-out"
                      value="Actualizar cliente"
                  />

              </Form>

        </div>
    </>
  )
}

export default EditarCliente