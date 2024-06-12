import React from 'react';
import PartModel from "../../../Models/PartModel";

export const SearchPart: React.FC<{ part: PartModel }> = (props) => {
    console.log('Image URL:', props.part.img); 

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
                    <p className='card-text'>
                        {props.part.partId}
                    </p>
                </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <a className="btn btn-md main-color text-white" href="#">
                    View Details
                </a>
            </div>
        </div>
    </div>
    )
}
