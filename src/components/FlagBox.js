import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import onz from '../img/onz.png'

function FlagBox({flag, code, name, updated}) {
    const flagPath = flag === 'https://disease.sh/assets/img/flags/all.png' ? onz : flag;
    const dateUpdated = `Ostatnia aktualizacja danych: ${updated}`;
    return (
        <Card className="flagBox">
            <CardContent>
               <img className="flagBox__flag" src={flagPath} alt={code}/>
                <h2 className="fw-400">{name}</h2>
                <h5 className="fw-400">{dateUpdated}</h5>
            </CardContent>
        </Card>
    )
}

export default FlagBox;