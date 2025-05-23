<!-- src/components/Libros.vue -->
<template>
  <div class="contenedor">
    
    <el-input
      v-model="busqueda"
      placeholder="Buscar libro por título, autor, género..."
      clearable
      prefix-icon="Search"
      style="margin-bottom: 20px; width: 300px;"
    />

    <el-table :data="librosFiltrados" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="titulo" label="Título" width="220" />
      <el-table-column prop="año_publicacion" label="Año" width="120" />
      <el-table-column prop="genero" label="Género" width="190" />
      <el-table-column prop="resumen" label="Resumen" />
      <el-table-column prop="id_autor" label="ID Autor" width="120" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { defineExpose } from 'vue'

const libros = ref([])
const busqueda = ref('')

// Obtener libros desde el backend
const fetchLibros = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/autor/libros/todos")
    if (!res.ok) throw new Error("Error al obtener libros")
    libros.value = await res.json()
  } catch (error) {
    console.error(error)
    ElMessage.error("No se pudieron cargar los libros.")
  }
}

// Computado para aplicar el filtro de búsqueda
const librosFiltrados = computed(() => {
  const query = busqueda.value.toLowerCase()
  return libros.value.filter(libro =>
    String(libro.id).toLowerCase().includes(query) ||
    libro.titulo.toLowerCase().includes(query) ||
    String(libro.año_publicacion).toLowerCase().includes(query) ||
    libro.genero.toLowerCase().includes(query) ||
    libro.resumen.toLowerCase().includes(query) ||
    String(libro.id_autor).toLowerCase().includes(query) ||
    (libro.autor && libro.autor.toLowerCase().includes(query))
  )
})


// Cargar libros al montar el componente
onMounted(() => {
  fetchLibros()
})

// Permitir que el componente padre invoque fetchLibros
defineExpose({ fetchLibros })
</script>



<style scoped>
    .contenedor{
        padding: 20px;
    }
     .el-table {
      font-family: 'Arial', sans-serif; /* Cambia 'Arial' por la fuente que desees */
      font-size: 16px; /* Puedes ajustar el tamaño también */
      color: black;
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
</style>