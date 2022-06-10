import React from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';

const SpotDetails  = props => {

    const { id } = useParams();

    useEffect( () => {
        
        fetchSpot();
        // eslint-disable-next-line
    }, []);


    const fetchSpot = async () => {
        try {
            const response = await spotsAPI.findOne(id)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    




    return (
      <h1>SpotDetails</h1>
    )
}

export default SpotDetails;