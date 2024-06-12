import React from 'react';

export const LatestRecord = () => {

    const records = [
        { time: '09:00', record: 'Worker1 uploaded a maintenance record for Machine1' },
        { time: '10:00', record: 'Worker1 uploaded a maintenance record for Machine1' },
        { time: '11:00', record: 'Worker1 uploaded a maintenance record for Machine1' },
        { time: '12:00', record: 'Worker1 uploaded a maintenance record for Machine1' },
        { time: '13:00', record: 'Worker1 uploaded a maintenance record for Machine1' },
    ];

    return (
        <div className="vertical-center-container">
            <div className="container">
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record.time}</td>
                                <td>{record.record}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
