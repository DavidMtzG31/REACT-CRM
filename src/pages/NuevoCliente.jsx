import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";

import Error from "../components/Error";

import { agregarCliente } from "../data/clientes";

export async function action( {request}) { /* Es como un loader pero va a funcionar para enviar el formulario, va en la etiqueta FORM en action="" */
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

    await agregarCliente(datos); /* Pasando los datos de los clientes hacia data > clientes */

    return redirect('/');
}

function NuevoCliente() {

  const navigate = useNavigate();
  const errores = useActionData();

  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
        <p>Llena todos los campos para registrar un nuevo cliente</p>

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

                  <Formulario /> 

                  <input
                      type="submit"
                      className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer hover:bg-blue-950 transition duration-200 ease-in-out"
                      value="Registrar cliente"
                  />

              </Form>

        </div>
    </>
  )
}

export default NuevoCliente