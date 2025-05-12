import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import { getAllTareas, postNuevaTarea, deleteTareaPorID, editTarea } from "../http/tareas";
import type { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";

export const useTareas = () => {
    const { tareas, setArrayTareas, addNuevaTarea, deleteTarea, updateTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        addNuevaTarea: state.addNuevaTarea,
        deleteTarea: state.deleteTarea,
        updateTarea: state.updateTarea,
    })));

    const getTareas = async () => {
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    }

    const crearTarea = async (nuevaTarea: ITarea) => {
        addNuevaTarea(nuevaTarea);
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire("Tarea creada", "La tarea se ha creado correctamente", "success");
        } catch (error) {
            deleteTarea(nuevaTarea.id!);
            console.error("Error al crear la tarea:", error);
        }
    }

    const editarTarea = async (tareaModificada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) => tarea.id === tareaModificada.id);

        updateTarea(tareaModificada);

        try {
            await editTarea(tareaModificada);
            Swal.fire("Tarea editada", "La tarea se ha editado correctamente", "success");
        } catch (error) {
            if (estadoPrevio) {
                updateTarea(estadoPrevio);
            }
            console.error("Error al editar la tarea:", error);
        }
    }

    const eliminarTarea = async (idTarea:string) => {
        const estadoPrevio = tareas.find((tarea) => tarea.id === idTarea);
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar la tarea eliminada",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;
        deleteTarea(idTarea);
        
        try {
            await deleteTareaPorID(idTarea);
            Swal.fire("Tarea eliminada", "La tarea se ha eliminado correctamente", "success");
        } catch (error) {
            if (estadoPrevio) {
                addNuevaTarea(estadoPrevio);
            }
            console.error("Error al eliminar la tarea:", error);
        }
        
    }

    return {
        getTareas,
        crearTarea,
        editarTarea,
        eliminarTarea,
        tareas,
    }
}
