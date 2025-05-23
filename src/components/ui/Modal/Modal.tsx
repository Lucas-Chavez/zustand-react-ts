import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import type { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas'

type IModal = {
    handleCloseModal: VoidFunction
}

const inialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
}

export const Modal : FC<IModal> = ( {handleCloseModal} ) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const {crearTarea, editarTarea} = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(inialState);

    useEffect(() => {
        if (tareaActiva) {
            setFormValues(tareaActiva)
        } 
    },[]);

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({...prev, [`${name}`]: value }))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();  
        if (tareaActiva) {
            editarTarea(formValues);
        } else {
            crearTarea({...formValues, id: new Date().toDateString()});
        }     
        setTareaActiva(null);
        handleCloseModal();
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div>
                    <h3>{tareaActiva? "Editar tarea" : "Crear tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input 
                        placeholder="Ingrese un titulo" 
                        type="text" 
                        required 
                        onChange={handleChange}
                        value={formValues.titulo}
                        autoComplete='off' 
                        name='titulo'
                        />

                        <textarea  
                        placeholder="Ingrese una descripción" 
                        required
                        onChange={handleChange} 
                        value={formValues.descripcion}
                        name='descripcion'
                        />

                        <input 
                        type="date" 
                        required 
                        onChange={handleChange}
                        value={formValues.fechaLimite}
                        autoComplete='off' 
                        name='fechaLimite'
                        />
                    </div>
                    <div className={styles.buttonCards}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit'>
                            {tareaActiva? "Actualizar tarea" : "Crear tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
