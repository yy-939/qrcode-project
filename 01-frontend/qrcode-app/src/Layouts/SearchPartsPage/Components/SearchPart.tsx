import React from 'react';
import PartModel from "../../../Models/PartModel";
import { Link } from 'react-router-dom';

export const SearchPart: React.FC<{ part: PartModel }> = (props) => {
    return(
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
        <div className='row g-0'>
            <div className='col-md-2'>
                <div className='d-none d-lg-block'>
                    <img src={props.part.img} alt={props.part.englishName} className="img-fluid" />
                </div>
                
                {/* mobile version */}
                <div className='d-lg-none d-flex justify-content-center 
                    align-items-center'>
                    <img src={props.part.img} alt={props.part.englishName} className="img-fluid" />
                </div>
                
            </div>
            <div className='col-md-6'>
                <div className='card-body'>
                    <h5 className='card-title'>
                        {props.part.chineseName}
                    </h5>
                    <h4>
                        {props.part.englishName}
                    </h4>
                    <h4>
                        Belonging to: {props.part.belongingEquipmentId}
                    </h4>
                    <p className='card-text'>
                        {props.part.partId}
                    </p>
                </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <Link to={`/detail/${props.part.id}`} className="btn btn-md highlight-color text-white">
                    View Details
                </Link>
            </div>
        </div>
    </div>
    )
}
