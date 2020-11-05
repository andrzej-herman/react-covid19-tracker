import React from 'react';
import { Card } from 'react-bootstrap';
import zarazeni from '../img/zarazeni.jpg';
import wyzdrowialo from '../img/wyzdrowialo.jpg';
import zgony from '../img/zgony.jpg';
import '../App.css';

function InfoBox({title, cases, total, updated}) {

    let image = zarazeni;
    if (title === 'wyzdrowialo') image = wyzdrowialo;
    if (title === 'zgony') image = zgony;

    let clsName = 'red';
    if (title === 'wyzdrowialo') clsName = 'green';
    if (title === 'zgony') clsName = 'black';

    return (

        <Card>
            <Card.Img variant="top" src={image} />
            <Card.Body style={{paddingTop: 20, paddingBottom: 5, paddingLeft: 20, paddingRight: 20}}>
                <Card.Text style={{marginBottom: 0, color: '#5b5b5b'}}>Dzisiaj:</Card.Text>
                <Card.Title className={clsName} style={{fontSize: 40}}>{cases}</Card.Title>
                <Card.Text style={{marginBottom: 0, color: '#5b5b5b'}}>Ogółem:</Card.Text>
                <Card.Title style={{fontSize: 24, color: '#5b5b5b'}}>{total}</Card.Title>
                <hr/>
                <Card.Title style={{fontSize: 12, color: '#aaaaaa'}}>Ostatnia aktualizacja: {updated}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default InfoBox;
