import axios from 'axios';

const API='http://localhost:3000/api/autor'

export const getObjeto=async()=>{
    try{
        const respuesta = await axios.get(API);
        return respuesta.data;
    }catch(error){
        console.error(error);
        return[]
    }
}

export const AgregarObjeto = async(autores)=>{
    try{
        const response = await axios.post(API, autores);
        
        return response.data;
    }catch (error){
        console.error(error);
    }
}
export const Actualizar = async(autores)=>{
    try{
        const response = await axios.put(`${API}/${autores.id_autor}`,autores);

        return response.data;
    }catch (error){
        console.error(error);
    }
}

export const EliminarObjetos = async(id)=>{
    try{
        const response = await axios.delete(`${API}/${id}`);
        return response.data;
    }catch (error){
        console.error(error);
    }
}