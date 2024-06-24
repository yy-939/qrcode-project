import React, { useEffect, useState, useCallback } from 'react';
import PartModel from '../../Models/PartModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { Link, useParams } from 'react-router-dom';
import RecordModel from '../../Models/RecordModel';
import { MaintenanceRecord } from './Components/MaintenanceRecord';
import { Pagination } from '../Utils/Pagination';

export const PartDetail = () => {
    const [part, setPart] = useState<PartModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Record State
    const [records, setRecords] = useState<RecordModel[]>([])
    const [isLoadingRecord, setIsLoadingRecord] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [totalAmountRecords, setTotalAmountRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const dbid = (window.location.pathname).split('/')[2];

    const fetchRecords = useCallback(async (partId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/machine-records/search/findByMaintenanceEquipmentIdContaining?maintenanceEquipmentId=${partId}&size=10000`);
            
            console.log(response.url)
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.maintenanceRecord;
            console.log(responseData)
            setTotalAmountRecords(responseJson.page.totalElements);

            const loadedRecords: RecordModel[] = responseData.map((record: any) => ({
                id: record.id,
                time: new Date(record.time),
                worker: record.worker,
                startDate: new Date(record.startDate),
                endDate: new Date(record.endDate),
                maintenanceContent: record.maintenanceContent,
                result: record.result,
                replacementParts: record.replacementParts,
                maintenanceEquipmentId: record.maintenanceEquipmentId
            }));

            // Sort the records by time
            const sortedRecords = loadedRecords.sort((a, b) => b.time.getTime() - a.time.getTime());

            setRecords(sortedRecords);
            setTotalPages(Math.ceil(sortedRecords.length / recordsPerPage));
            setIsLoadingRecord(false);
        } catch (error : any) {
            setHttpError(error.message);
            setIsLoadingRecord(false);
        }
    }, [recordsPerPage]); // 当 recordsPerPage 发生变化时，fetchRecords 会重新创建

    useEffect(() => {
        const fetchParts = async () => {
            const baseURL: string = `http://localhost:8080/machine-parts/${dbid}`;

            console.log('Fetching URL:', baseURL);

            const response = await fetch(baseURL);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedPart: PartModel = {
                id: responseJson.id,
                partId: responseJson.partId,
                englishName: responseJson.englishName,
                chineseName: responseJson.chineseName,
                belongingEquipmentId: responseJson.belongingEquipmentId,
                img: responseJson.img
            }

            setPart(loadedPart);
            setIsLoading(false);
            console.log(loadedPart)
            // Fetch records related to the partId
            fetchRecords(loadedPart.partId);
        };
        fetchParts().catch((error: any) => {
            console.error('Fetch error:', error);
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); // scroll page to the top
    }, [dbid, fetchRecords]); 
    // fetchParts 函数会在组件挂载时运行一次，因为依赖项数组 [dbid, fetchRecords] 包含的依赖项初始值时会运行一次
    // 当 dbid 或 fetchRecords 变化时，fetchParts 会重新执行

    const paginate = (pageNumber: number) => setCurrPage(pageNumber); 

    if (isLoading || isLoadingRecord){
        return(
            <SpinnerLoading/>
        )
    }

    if (httpError){
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastRecord = currPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        <img src={part?.img} width='226' height='349' alt={part?.englishName} />
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{part?.englishName}</h2>
                            <h4>{part?.chineseName}</h4>
                            <h5>Belonging to: {part?.belongingEquipmentId}</h5>
                            <p className='lead'>{part?.partId}</p>
                            <Link to={`/form/${dbid}`} className="btn highlight-color btn-lg mt-3 text-white">
                                Add Maintenance Record
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Time</th>
                                <th scope="col">Worker</th>
                                <th scope="col">Maintenance Part</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Maintenance Content</th>
                                <th scope="col">Result</th>
                                <th scope="col">Replacements</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record, index) => (
                                <MaintenanceRecord record={record} index={index + (currPage - 1) * recordsPerPage} key={record.id} />
                            ))}
                        </tbody>
                    </table>
                    {totalPages > 1 &&
                        <Pagination currentPage={currPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>

            {/* mobile version */}
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={part?.img} width='226' height='349' alt={part?.englishName} />
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{part?.englishName}</h2>
                        <h4 className='text-primary'>{part?.chineseName}</h4>
                        <h5>Belonging to: {part?.belongingEquipmentId}</h5>
                        <p className='lead'>{part?.partId}</p>
                        <Link to={`/form/${dbid}`} className="btn highlight-color btn-lg mt-3">
                            Add Maintenance Record
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Time</th>
                                <th scope="col">Worker</th>
                                <th scope="col">Maintenance Part</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Maintenance Content</th>
                                <th scope="col">Result</th>
                                <th scope="col">Replacements</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record, index) => (
                                <MaintenanceRecord record={record} index={index + (currPage - 1) * recordsPerPage} key={record.id} />
                            ))}
                        </tbody>
                    </table>
                    {totalPages > 1 &&
                        <Pagination currentPage={currPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
};
