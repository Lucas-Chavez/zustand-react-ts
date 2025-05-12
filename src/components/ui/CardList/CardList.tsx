import type { FC } from 'react';
import type { ITarea } from '../../../types/ITarea';
import styles from './CardList.module.css';
import { useTareas } from '../../../hooks/useTareas';

type ICardList = {
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) => void
}

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
    
    const {eliminarTarea} = useTareas();

    const deleteTarea = () => {
        eliminarTarea(tarea.id!);  
    }

        const updateTarea = () => {
        handleOpenModalEdit(tarea); 
    }
    
    return (
        <div className={styles.containerCard}>
            <div>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>Fecha limite: <b>{tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.actionCard}>
                <button onClick={deleteTarea}>Eliminar</button>
                <button onClick={updateTarea}>Editar</button>
            </div>
        </div>
    )
}
