import { useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore';
import { CardList } from '../CardList/CardList';
import { Modal } from '../Modal/Modal';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';

import styles from './ListTareas.module.css';


export const ListTareas = () => {

    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const { getTareas, tareas} = useTareas(); 

    useEffect(() => {
        getTareas();
    }, []);	

    const [opentModalTarea, setOpenModalTarea] = useState(false);

    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea);
        setOpenModalTarea(true);
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false);
    }


    return (
        <>
            <div className={styles.containerPrincipalListTareas}>
                <div className={styles.containerTitleAndButton}>
                    <h2>Lista de tareas</h2>
                    <button
                    onClick={() => setOpenModalTarea(true)}
                    >Agregar tarea</button>
                </div>
                <div className={styles.containerList}>
                    {
                    tareas.length > 0 ?
                        tareas.map((tarea) => <CardList 
                        handleOpenModalEdit={handleOpenModalEdit}
                        key={tarea.id} tarea={tarea}/>)
                    : 
                        <div>
                            <h3>No hay tareas</h3>
                        </div>
                    }
                </div>
            </div>
            { opentModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
        </>

    )
}
