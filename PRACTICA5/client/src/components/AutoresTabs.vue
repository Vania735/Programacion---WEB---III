<template>
  <div class="contenedor">
    <el-tabs v-model="activeTab" @tab-click="handleTabChange" tab-position="top">
      <el-tab-pane label="Listado de Autores" name="listado">
        <Listado @mostrar-libros="handleMostrarLibros" />
      </el-tab-pane>

      <el-tab-pane label="Agregar Autor" name="agregar">
        <Agregar @autores-agregado="refrescarListado" />
      </el-tab-pane>

      <el-tab-pane label="Listado de Libros" name="libros">
        <Libros />
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="modalVisible" title="Libros del Autor" width="600">
      <template #default>
        <el-table :data="librosAutor" style="width: 100%">
          <el-table-column prop="titulo" label="Título" />
          <el-table-column prop="año_publicacion" label="Año" />
          <el-table-column prop="genero" label="Género" />
        </el-table>
        <div v-if="librosAutor.length === 0" style="margin-top: 20px; text-align: center; color: red;">
          Este autor no tiene libros registrados.
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Listado from './Listado.vue'
import Agregar from './Agregar.vue'
import Libros from './Libros.vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('listado')
const modalVisible = ref(false)
const librosAutor = ref([])

const handleTabChange = (tab) => {
  console.log("Pestaña actual:", tab.name)
}

const refrescarListado = () => {
  console.log("Se agregó un autor.")
}

const handleMostrarLibros = async (id_autor) => {
  try {
    const res = await fetch(`http://localhost:3000/api/autor/${id_autor}/libros`)
    if (!res.ok) throw new Error("Error al obtener libros del autor")
    librosAutor.value = await res.json()
    modalVisible.value = true

    if (librosAutor.value.length === 0) {
      ElMessage.info("Este autor no tiene libros.")
    }
  } catch (error) {
    console.error(error)
    ElMessage.error("No se pudieron obtener los libros.")
  }
}
</script>
