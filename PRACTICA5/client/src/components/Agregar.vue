<template>
  <div class="contenedor">
    <div class="encabezado">
      <h1>Gestion de Autores</h1>
      
    </div>

    <el-button plain @click="abrirFormularioNuevo">
      Crear Nuevo Autor
    </el-button>
    
    <el-dialog v-model="dialogFormVisible" title="Agregar Autores" width="500" >
      <el-form :model="form" @submit.prevent="EnviarAutor()">
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
          <el-button @click="dialogFormVisible = false"> Cancelar </el-button>
          <el-button type="primary" @click="Enviar" native-type="submit"> Confirmar </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import {AgregarObjeto} from '../apis/api.js';
  import { useToast } from "vue-toastification";

  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const emit= defineEmits(['autores-agregado']);
  const toast = useToast();

  const form = reactive({
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    biografia: ''
  })

const validarFechaReal = (fecha) => {
  const [año, mes, dia] = fecha.split("-").map(Number);

  if (
    isNaN(año) || isNaN(mes) || isNaN(dia) ||
    mes < 1 || mes > 12 || dia < 1 || dia > 31
  ) return false;

  const date = new Date(año, mes - 1, dia); // Mes es base 0

  return (
    date.getFullYear() === año &&
    date.getMonth() === mes - 1 &&
    date.getDate() === dia
  );
};
 
const Enviar = async () => {
  const nombreRegex = /^[a-zA-Z\s]{3,}$/;
  const nacionalidadRegex = /^[a-zA-Z\s]{2,}$/;
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!nombreRegex.test(form.nombre)) {
    toast.error("Nombre inválido. Solo letras y espacios, mínimo 3 caracteres.");
    return;
  }

  if (!nacionalidadRegex.test(form.nacionalidad)) {
    toast.error("Nacionalidad inválida. Solo letras, mínimo 2 caracteres.");
    return;
  }

  if (!fechaRegex.test(form.fecha_nacimiento) || !validarFechaReal(form.fecha_nacimiento)) {
    toast.error("Fecha inválida. Use una fecha real en formato YYYY-MM-DD.");
    return;
  }

  if (!form.biografia || form.biografia.length < 10) {
    toast.error("Biografía muy corta. Mínimo 10 caracteres.");
    return;
  }

  try {
    const data = { ...form };
    await AgregarObjeto(data);
    dialogFormVisible.value = false;
    emit("autores-agregado");
    toast.success("Se agregó correctamente", {
      position: "top-center",
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
    toast.error("Error al guardar el autor.");
  }
};

const esNuevo = ref(true)

const abrirFormularioNuevo = () => {
  esNuevo.value = true
  form.nombre = ''
  form.nacionalidad = ''
  form.fecha_nacimiento = ''
  form.biografia = ''
  dialogFormVisible.value = true
}
const MostrarInput = (autores) => {
  esNuevo.value = false
  form.id_autor = autores.id_autor
  form.nombre = autores.nombre
  form.nacionalidad = autores.nacionalidad
  form.fecha_nacimiento = autores.fecha_nacimiento
  form.biografia = autores.biografia
  dialogFormVisible.value = true
}
</script>

<style scoped>
  .encabezado {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
  }

  .encabezado h1 {
    margin: 0;
    color: #222;
  }

  .contenedor {
    padding: 20px;
  }
</style>