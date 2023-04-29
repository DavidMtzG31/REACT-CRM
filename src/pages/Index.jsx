import {useLoaderData} from 'react-router-dom'; // Es un Hook que se usa para acceder a la info del Loader

import ListaClientes from '../components/ListaClientes';
import { obtenerClientes } from '../data/clientes';

export function loader() {

  const clientes = obtenerClientes();

  return clientes;
}

function Index() {

  const clientes = useLoaderData();

  return (
   <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p>Administra tus clientes</p>

      {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-blue-800 text-white'>
                <tr>
                  <th className='p-2'>Cliente</th>
                  <th className='p-2'>Contacto</th>
                  <th className='p-2'>Acciones</th>
                </tr>
            </thead>
          

                <tbody>
                  {
                    clientes.map(cliente => {
                      return (
                        <ListaClientes
                            cliente = {cliente}
                            key = {cliente.id}
                        />
                      )
                    })
                  }
                </tbody>
        </table>
      ): (<h1>No hay clientes</h1>) }
   </>
  )
}

export default Index