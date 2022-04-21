import React from 'react'

const TableHotels = ( {host,openModal} ) => {
    console.log(host)
    return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Razon Social</th>
                        <th>Ciudad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        host.host.map(val => (
                            <tr key={val.id}>
                                <td><img alt='imgH' src={val.imagen} width="200px" /></td>
                                <td>{val.nombre}</td>
                                <td>{val.razon_social}</td>
                                <td>{val.city}</td>
                                <td><button className='btn btn-primary' onClick={() => { openModal(val.id); }} >Información</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    )
}
export default TableHotels