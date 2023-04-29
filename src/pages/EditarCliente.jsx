import { obtenerClienteEditar } from "../data/clientes";

export async function loader( {params} ) {
 const cliente = await obtenerClienteEditar(params.clienteId)

  return [];
}

function EditarCliente() {
  return (
    <div>EditarCliente</div>
  )
}

export default EditarCliente