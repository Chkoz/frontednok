import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import TableHotels from './TableHotels';
import Modal from 'react-modal';

axios.defaults.baseURL = "https://desarrollo.api.noktos.com/api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const TableScreen = () => {
    const { token } = useSelector(state => state.auth)
    const [datahotel, setDataHotel] = useState(null)
    const [filterhotel, setFilterHotel] = useState(null)
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = (id) => {
        setFilterHotel(datahotel.host.filter(x => x.id === id)[0])
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        axios.get("/admin/hosts/50")
            .then(({ data }) => {
                setDataHotel(data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }, [])

console.log(filterhotel)
    return (
        <div className="container">
            <div>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{filterhotel?.nombre} </h2>

                    <div className='row' >
                        <label>Direccion:</label>
                        <input type="text" value={filterhotel?.direccion} disabled className='form-control' />
                        <label>Correo:</label>
                        <input type="text" value={filterhotel?.email} disabled className='form-control' />
                        <label>Amenidades:</label>
                        <div className='sangria_parrafo'>
                            <ul>
                                {
                                    filterhotel?.amenidades &&
                                    filterhotel.amenidades.map(val => (
                                        <li>{val?.nombre}</li>
                                    ))

                                }
                            </ul>
                        </div>
                    </div>
                    <br />
                    <button className='btn btn-danger' onClick={closeModal}>Cerrar</button>
                </Modal>
            </div>
            {
                datahotel == null ?
                    <div>
                        Cargando....
                    </div>
                    :
                    <TableHotels host={datahotel} openModal={openModal} />
            }
        </div>
    )
}
