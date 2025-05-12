import { create } from 'zustand'
import type { ITarea } from '../types/ITarea';

interface ITareaStore {
    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayTareas: (arrayTareas: ITarea[]) => void;
    addNuevaTarea: (nuevaTarea: ITarea ) => void;
    updateTarea: (tareaActualizada: ITarea) => void;
    deleteTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
    tareas: [],
    tareaActiva: null,
    
    // Funciones para modificar el array de tareas
    
    // Añadir array de tareas
    setArrayTareas: (arrayTareas) => 
        set(() => ({tareas: arrayTareas})), 

    // Añadir una tarea al array 
    addNuevaTarea: (nuevaTarea) => 
        set((state) => ({tareas: [...state.tareas, nuevaTarea]})),

    // Modificar una tarea del array
    updateTarea: (tareaModificada) => 
        set((state) => {
            const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaModificada.id ? {...tarea, ...tareaModificada} : tarea);
            return {tareas: arregloTareas}
        }),

    // Eliminar una tarea del array
    deleteTarea: (idTarea) => 
        set((state) => {
            const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
            return {tareas: arregloTareas}
        }),

    // Agregar la tarea activa
    setTareaActiva: (tareaActivaIn) => 
        set(() => ({tareaActiva: tareaActivaIn})),
}))