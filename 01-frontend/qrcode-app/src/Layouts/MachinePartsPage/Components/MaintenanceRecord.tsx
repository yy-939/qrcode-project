import React from 'react';
import RecordModel from "../../../Models/RecordModel";

export const MaintenanceRecord: React.FC<{ record: RecordModel, index: number }> = (props) => {    
    return(
        <tr key={props.record.id}>
            <th scope="row">{props.index + 1}</th>
            <td>{props.record.time.toLocaleString()}</td>
            <td>{props.record.worker}</td>
            <td>{props.record.maintenanceEquipmentId}</td>
            <td>{props.record.startDate.toLocaleDateString()}</td>
            <td>{props.record.endDate.toLocaleDateString()}</td>
            <td>{props.record.maintenanceContent}</td>
            <td>{props.record.result ? "Success" : "Failure"}</td>
            <td>
                {props.record.replacementParts && 
                    Object.entries(props.record.replacementParts).map(([key, value]) => (
                        <div key={key}>{key}: {value}</div>
                    ))
                }
            </td>
        </tr>
    )
}