
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";



function App() {

  
  const [modoOscuro, setModoOscuro] = useState(false);

  //variable de estado
  const [personas,setProductos]=useState([]);

  const [formularioAgregar, SetAgregarProducto] = useState({
    nombre: '',
    telefono: '',
    puesto: ''
  });
  
  const [formularioEditar, SetEditarProducto] = useState({
    nombre: '',
    telefono: '',
    puesto: ''
  });

  const [productoId,SetProductoId]=useState(null);
  const [busqueda,SetBusqueda]=useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mostrar, setMostrar] = useState(false);
  const CerrarModal = () => setMostrar(false);
  const AbrirModal = () => setMostrar(true);

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/personas');
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      alert('ERROR' + error);
    }
  },[]);

  useEffect(()=>{
    fetchProductos();
  },[fetchProductos]);

  const Agregar=async(e)=>{
    e.preventDefault();

    const { nombre, telefono, puesto } = formularioAgregar;
    // Validación de los 3 campos
    if (!nombre.trim() || !telefono.trim() || !puesto.trim()) {
      alert('Todos los campos (Nombre, Teléfono y Puesto) son requeridos');
      return;
    }

    try{
     const respuesta=await fetch(`http://localhost:3001/api/personas`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioAgregar
        })
      });
      if(!respuesta.ok){
        let errorMensaje='Error al cargar';
        try{
          const error=await respuesta.json();
          errorMensaje=error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      handleClose();
      Swal.fire({
        title: "!Se agrego correctamente a la Persona!",
        icon: "success",
        draggable: true,
        timer:2000
      });

      SetAgregarProducto({
        nombre: '',
        telefono: '',
        puesto: ''
      });
      fetchProductos();

    }catch(error){
      console.error(error);
      Swal.fire({
        title: "!No se pudo agregar a la nueva Personal!",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }

  }
  const cambiosFormularioAgregar=async(e)=>{
    SetAgregarProducto({
      ...formularioAgregar,
      [e.target.name]:e.target.value
    })
  }

  const EditarProductos = (producto) => {
    SetEditarProducto({
      nombre: producto.nombre,
      telefono: producto.telefono,
      puesto: producto.puesto
    });
    SetProductoId(producto.id);
    AbrirModal();
  };


  const cambiosFormularioEditar=(e)=>{
    SetEditarProducto({
      ...formularioEditar,
      [e.target.name]:e.target.value
    });
  }
  const EditarProducto=async(e)=>{
    e.preventDefault();
    
    const { nombre, telefono, puesto } = formularioEditar;
    
    if (!nombre.trim() || !telefono.trim() || !puesto.trim()) {
      alert('Todos los campos (Nombre, Teléfono y Puesto) son requeridos');
      return;
    }
    try{
     const respuesta=await fetch(`http://localhost:3001/api/personas/${productoId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioEditar
        })
      });
      if(!respuesta.ok){
        let errorMensaje='Error al cargar';
        try{
          const error=await respuesta.json();
          errorMensaje=error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      CerrarModal();
      Swal.fire({
        title: "!Se edito correctamente los datos de la Persona!",
        icon: "success",
        draggable: true,
        timer:2000
      });
      fetchProductos();

    }catch(error){
      console.error(error);
      Swal.fire({
        title: "!No se pudo editar los datos de la Persona!",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }
  }
 const EliminarProducto=async(id)=>{
  Swal.fire({
    title: "¿Estas seguro de que deseas eliminar este Trabajador?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si, Eliminar!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      try{
        await fetch(`http://localhost:3001/api/personas/${id}`,{
          method:`DELETE`
        });
        Swal.fire({
          title: "¡Personal Eliminado Correctamente!",
          icon: "success",
          timer:2000
        });
        fetchProductos();
      }catch(error){
        Swal.fire({
          title: "¡No se pudo eliminar al Personal",
          icon: "success",
          timer:2000
        });
      }
      
    }
  });
 }
//* TABLA EN LA PAGINA ***************************************************************** */}
const customStyles = {
  headCells: {
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
};
 
const columnas=[
  {
    name:'ID',
    selector: row=>row.id,
    sortable:true,
    width: '10%',
    
  },
  {
    name:'Nombre',
    selector:row=>row.nombre,
    sortable:true
  },
  {
    name:'Telefono',
    selector:row=>row.telefono,
    sortable:true
  },
  {
    name:'Puesto',
    selector:row=>row.puesto,
    sortable:true
  },
  {
    name:'Acciones',
    width: '15%',
    cell:row=>(
      <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-warning"  onClick={()=>{EditarProductos(row)}}><CiEdit /></button>
              <button type="button" className="btn btn-danger" onClick={()=>{EliminarProducto(row.id)}}><MdDeleteForever /></button>
      </div>
    )
  }
 ];

 const PaginacionOpciones={
   rowsPerPageText:'Filas por pagina'
 };

//* BARRA PARA LA BUSQUEDA DE PERSONAS************************************************************** 

  return (
    
    <div className='fondo1'>
    <div className={`container  ${modoOscuro ? 'fondo-oscuro' : 'fondo-claro'}`}>
      <br></br><br></br><br></br>
      <h1 className='titulo'>PERSONAL   ADMINISTRATIVO</h1>
      

      <div className='forma'>


        <div className='division'>
          <div className='cuadro1'>
            <Button variant="primary" onClick={handleShow} className="mb-3">Crear</Button>
          </div>

          <div className='cuadro2'>
            <Button
              variant={modoOscuro ? "light" : "dark"}
              onClick={() => setModoOscuro(!modoOscuro)}
              className="mb-3"
            >
              {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
            </Button>
          </div>
        </div>


      

       <Form.Control
        type='text'
        placeholder='Buscar  dato  personal'
        className='mb-3'
        value={busqueda}
        onChange={(e)=>{SetBusqueda(e.target.value)}}
       />  

      <br></br>
      <DataTable
        columns={columnas}
        data={personas.filter(producto =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.telefono.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.puesto.toLowerCase().includes(busqueda.toLowerCase())
        )}
        pagination
        highlightOnHover
        striped
        className={`tabla-personalizada ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}
        //className="tabla-personalizada"   //PARA COLOCAR COLORES
        paginationComponentOptions={PaginacionOpciones}
        customStyles={customStyles}
      />


    {/*Modal para Agregar nuevo producto *********************************************************** */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombre}
              />
               <p></p>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el Nro de Telefono"
                name='telefono'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.telefono}
              />
             <p></p>
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el puesto de Trabajo"
                name='puesto'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.puesto}
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Agregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

{/* M O D A L    P A R A     E D I T A R   *********************************************************************************/}
      <Modal show={mostrar} onHide={CerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombre}
              />
              <p></p>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el telefono"
                name='telefono'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.telefono}
              />
               <p></p>
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el puesto"
                name='puesto'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.puesto}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <br></br>
    </div>
    </div>
  );
}

export default App;