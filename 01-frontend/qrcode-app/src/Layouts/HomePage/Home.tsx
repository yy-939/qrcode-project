import React from 'react'
import { LatestRecord } from './Components/LatestRecord'


export const Home = () => {
    return(
        <> {/* react specific way: parent component */}
            <LatestRecord/>
            <LatestRecord/>
            <LatestRecord/>
        </>
    )
}