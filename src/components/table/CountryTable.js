import React from 'react';
import { Table } from 'react-bootstrap';
import './CountryTable.css';

function CountryTable({ countries }) {
    return (
        <Table striped hover size="sm" className="table">
            <thead>
                <tr>
                <th>LP</th>
                <th>Państwo</th>
                <th>Ilość</th>
               
                </tr>
            </thead>
            <tbody>

            {countries.map(({name, totalCases, position}) => (
                <tr>
                <td className={name === 'Polska' ? 'red' : ''} style={{fontSize: 14, paddingTop: 5}}>{position}.</td>
                <td className={name === 'Polska' ? 'red' : ''} style={{fontSize: 14, paddingTop: 5}}>{name}</td>
                <td className={name === 'Polska' ? 'red' : ''} style={{fontSize: 14, paddingTop: 5}}>{totalCases.toString()}</td>
                </tr>
            ))}


            </tbody>
        </Table>

    )
}

export default CountryTable
