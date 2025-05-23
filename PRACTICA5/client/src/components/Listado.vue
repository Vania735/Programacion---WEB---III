<template>

    <div class="contenedor">
    <div class="barra-busqueda">
      <el-input
        v-model="busqueda"
        placeholder="Buscar autores"
        clearable
      />
    </div>
    <br>      
    <el-table 
        :data="autoresFiltrados" 
        height="350" 
        style="width: 100%" 
        :row-class-name="rowClassName">
       <el-table-column prop="id_autor" label="id_autor" width="120" />
       <el-table-column prop="nombre" label="Nombre" width="160" />
       <el-table-column prop="nacionalidad" label="Nacionalidad" width="150" />
       <el-table-column prop="fecha_nacimiento" label="Fecha Nacimiento" width="180" />
       <el-table-column prop="biografia" label="Biografia" width="350" />
       <el-table-column label="Acciones" width="210">
            <template #default="scoped">

                            <el-button type="primary" :icon="Edit" @click="MostrarInput(scoped.row)" circle />
                            <el-button type="danger" :icon="Delete" @click="FarmEliminarObjeto(scoped.row.id_autor)" circle />
                            <el-button type="success" :icon="Check" @click="mostrarLibros(scoped.row.id_autor)" circle />
            </template>
       </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="Editar Autores" width="500">
    <el-form :model="form" >
      <el-form-item label="Nombre" :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nacionalidad" :label-width="formLabelWidth">
        <el-input v-model="form.nacionalidad" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Fecha Nacimiento" :label-width="formLabelWidth">
        <el-input v-model="form.fecha_nacimiento" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Biografia" :label-width="formLabelWidth">
        <el-input v-model="form.biografia" autocomplete="off" />
      </el-form-item>
      
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="Actualizar()">
          Confirmar
        </el-button>
      </div>
    </el-form>
  </el-dialog>
<!-- Modal para mostrar libros 
    <el-dialog v-model="modalVisible" title="Libros del Autor">
      <el-table :data="libros">
        <el-table-column prop="titulo" label="Título" />
        <el-table-column prop="año" label="Año" />
        <el-table-column prop="género" label="Género" />
      </el-table>
    </el-dialog>   -->
  
    <el-dialog v-model="modalVisible" title="Libros del Autor">
      <template #default>
        <el-table :data="libros" style="width: 100%">
          <el-table-column prop="titulo" label="Título" />
          <el-table-column prop="año_publicacion" label="Año" />
          <el-table-column prop="genero" label="Género" />
        </el-table>

        <div v-if="libros.length === 0" style="margin-top: 20px; color: red; text-align: center;">
          Este autor no tiene libros registrados.
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script setup>

    const rowClassName = ({ rowIndex }) => {
      return rowIndex % 2 === 0 ? 'fila-par' : 'fila-impar';
    };

    import { computed } from 'vue'

    const busqueda = ref('');

    const autoresFiltrados = computed(() => {
      if (!busqueda.value) return autores.value;
      const termino = busqueda.value.toLowerCase();

      return autores.value.filter(m => {
        return (
          String(m.id_autor).toLowerCase().includes(termino) ||
          m.nombre.toLowerCase().includes(termino) ||
          String(m.nacionalidad).toLowerCase().includes(termino) ||
          String(m.fecha_nacimiento).toLowerCase().includes(termino) ||
          String(m.biografia).toLowerCase().includes(termino)
        );
      });
    });
    //const autores = ref([])       // tu lista de autores
    const libros = ref([])        // lista temporal de libros del autor
    const modalVisible = ref(false)

  //  const mostrarLibros = async (idAutor) => {
  //    const res = await fetch(`http://localhost:3000/api/autor/${idAutor}/libros`)
  //    libros.value = await res.json()
  //    modalVisible.value = true
  //  }
    const mostrarLibros = async (id_autor) => {
      try {
        const res = await fetch(`http://localhost:3000/api/autor/${id_autor}/libros`)
        if (!res.ok) throw new Error("Error al obtener libros")
        libros.value = await res.json()
        modalVisible.value = true

        if (libros.value.length === 0) {
          ElMessage.info("Este autor no tiene libros registrados.")
        }

      } catch (error) {
        console.error("Error al mostrar libros:", error)
        ElMessage.error("No se pudo cargar la lista de libros.")
      }
    }
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { ref, onMounted, reactive } from 'vue';
    import { EliminarObjetos, getObjeto } from '../apis/api.js';
    import { Actualizar as actualizarAPI } from '../apis/api.js';
    import { Delete, Edit, Check } from '@element-plus/icons-vue'
    import { useToast } from "vue-toastification";
    const toast = useToast();
    const autores=ref([]);
    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const form = reactive({
    id_autor:null,
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    biografia: ''
  })
    const TablaMostrar = async () => {
        try{
            const resultado=await getObjeto();
            autores.value=resultado;
        }catch(error){
            console.error(error);
        }
    }
    const MostrarInput = async(autores)=>{
        try{
            form.id_autor=autores.id_autor;
            form.nombre=autores.nombre;
            form.nacionalidad=autores.nacionalidad;
            form.fecha_nacimiento=autores.fecha_nacimiento;
            form.biografia=autores.biografia;
            dialogFormVisible.value=true;
        }catch(error){
            console.error(error);
        }
    }
    const Actualizar=async()=>{
        try {
    // Validaciones con expresiones regulares
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
    const nacionalidadRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!nombreRegex.test(form.nombre)) {
      toast.error("El nombre debe tener solo letras y al menos 3 caracteres", {
        position: "top-center",
        timeout: 3000,
      });
      return;
    }

    if (!nacionalidadRegex.test(form.nacionalidad)) {
      toast.error("La nacionalidad debe tener solo letras y al menos 3 caracteres", {
        position: "top-center",
        timeout: 3000,
      });
      return;
    }

if (!fechaRegex.test(form.fecha_nacimiento)) {
  toast.error("La fecha debe tener el formato YYYY-MM-DD", {
    position: "top-center",
    timeout: 3000,
  });
  return;
}

const [anio, mes, dia] = form.fecha_nacimiento.split("-").map(Number);

// OJO: En JavaScript, los meses van de 0 (enero) a 11 (diciembre)
const fecha = new Date(anio, mes - 1, dia);

// Comprobamos que la fecha generada coincida con los valores originales
if (
  fecha.getFullYear() !== anio ||
  fecha.getMonth() !== mes - 1 ||
  fecha.getDate() !== dia
) {
  toast.error("La fecha ingresada no es válida", {
    position: "top-center",
    timeout: 3000,
  });
  return;
}



    const data = {
      id_autor: form.id_autor,
      nombre: form.nombre,
      nacionalidad: form.nacionalidad,
      fecha_nacimiento: form.fecha_nacimiento,
      biografia: form.biografia
    };

    await actualizarAPI(data);

    dialogFormVisible.value = false;
    await TablaMostrar();

    toast.success("Se actualizó correctamente", {
      position: "top-center",
      timeout: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.error("Hubo un error al actualizar el autor", {
      position: "top-center",
      timeout: 3000,
    });
  }
    }
    const FarmEliminarObjeto = async (id_autor) => {
      ElMessageBox.confirm(
        '¿Estás seguro que deseas eliminar este autor?',
        'Eliminar',
        {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        }
      )
        .then(async () => {
          try {
            const res = await fetch(`http://localhost:3000/api/autor/${id_autor}`, {
              method: 'DELETE'
            });

            const data = await res.json();

            if (!res.ok) {
              ElMessage.error(data.mensaje || 'Error al eliminar autor.');
              return;
            }

            await TablaMostrar();

            toast.success(data.mensaje || "Se eliminó correctamente", {
              position: "top-center",
              timeout: 2000,
            });
          } catch (error) {
            console.error("Error al eliminar autor:", error);
            ElMessage.error('Error del servidor al intentar eliminar.');
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Eliminación cancelada',
          });
        });
    };
    onMounted(TablaMostrar);
    defineExpose({TablaMostrar})
  </script>

  <style scoped>
    .el-table {
      font-family: 'Arial', sans-serif; /* Cambia 'Arial' por la fuente que desees */
      font-size: 16px; /* Puedes ajustar el tamaño también */
      color: black;
    }

    .el-table-column th {
      color: red ;
      font-weight: bold;
    }

    .barra-busqueda {
      margin-bottom: 20px;
      width: 100%;
    }

    .barra-busqueda .el-input {
      width: 100%;
      height: 40px;
    }

    .barra-busqueda .el-input__inner {
      border: 2px solid black;
      height: 40px;
      font-size: 16px;
    }

    .contenedor {
      padding: 20px;
    }
    



      ::v-deep(.fila-par) {
        background-color: #f5f5f5bb;
      }

      ::v-deep(.fila-impar) {
        background-color: #ffffff;
      }

          .el-table .cell {
        padding: 20px; /* Ajusta según el espacio que desees */
      }
    
  </style>
