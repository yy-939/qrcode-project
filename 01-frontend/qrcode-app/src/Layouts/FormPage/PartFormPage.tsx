import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PartModel from "../../Models/PartModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";


export const PartForm = () => {
    const [part, setPart] = useState<PartModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [worker, setWorker] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [maintenanceContent, setMaintenanceContent] = useState("");
    const [result, setResult] = useState(true);
    const [replacementParts, setReplacementParts] = useState([{ partName: "", quantity: "" }]);

    const dbid = (window.location.pathname).split('/')[2];
    
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
        };
        fetchParts().catch((error: any) => {
            console.error('Fetch error:', error);
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); // scroll page to the top
    }, [dbid]); 


    const handleAddRow = () => {
        setReplacementParts([...replacementParts, { partName: "", quantity: "" }]);
    };

    const handlePartChange = (index: number, field: 'partName' | 'quantity', value: string) => {
        const newParts = [...replacementParts];
        newParts[index][field] = value;
        setReplacementParts(newParts);
    };

    const handleDeleteRow = (index: number) => {
        if (replacementParts.length > 1) {
            const newParts = replacementParts.filter((_, i) => i !== index);
            setReplacementParts(newParts);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newRecord = {
            id: null,
            time: new Date(),
            worker: worker,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            maintenanceContent: maintenanceContent,
            result: result,
            replacementParts: replacementParts.reduce((acc:{ [key: string]: number }, part) => {
                if (part.partName && part.quantity) {
                    acc[part.partName] = parseInt(part.quantity);
                }
                return acc;
            }, {}),
            maintenanceEquipmentId: part?.partId || ""
        };

        try {
            const response = await fetch('http://localhost:8080/machine-records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            alert('Record successfully added');

            navigate(`/detail/${dbid}`);

        } catch (error: any) {
            setHttpError(error.message);
        }
    };


    if (isLoading){
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

    return (
        <div className="py-5 text-center">
            <h2>Maintenance Log Form for {part?.englishName}</h2>
            <h3>{part?.chineseName}维修记录</h3>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">{part?.englishName}  {part?.chineseName}</span>
                    </h4>
                    <p className='text-start'>{part?.partId}</p>
                    <img src={part?.img} width='226' height='349' alt={part?.englishName} />
                </div>

                <div className="col-md-7 col-lg-8">
                    <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="username" className="form-label">Maintenance Worker / 维修人员姓名</label>
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control" id="username" placeholder="Zhang San / 张三" required value={worker} onChange={(e) => setWorker(e.target.value)} />
                                    <div className="invalid-feedback">
                                        Your name is required. 请输入你的名字。
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="startDate" className="form-label">Maintenance Start Date / 维修开始时间</label>
                                <input type="date" className="form-control" id="startDate" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                <div className="invalid-feedback">
                                    Valid start date is required. 请输入有效的维修开始时间。
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="endDate" className="form-label">Maintenance End Date / 维修结束时间</label>
                                <input type="date" className="form-control" id="endDate" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                <div className="invalid-feedback">
                                    Valid end date is required. 请输入有效的维修结束时间。
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="content" className="form-label">Maintenance Content / 维修内容</label>
                                <input type="text" className="form-control" id="content" required value={maintenanceContent} onChange={(e) => setMaintenanceContent(e.target.value)} />
                                <div className="invalid-feedback">
                                    Please enter the contents of the Maintenance. 请输入维修内容。
                                </div>
                            </div>

                            <h5 className="mb-3 text-center">Result / 维修结果</h5>
                            <div className="my-3 text-center">
                                <div className="d-flex justify-content-center">
                                    <div className="form-check d-flex align-items-center me-3">
                                        <input id="success" name="result" type="radio" className="form-check-input me-2" checked={result === true} onChange={() => setResult(true)} required />
                                        <label className="form-check-label" htmlFor="success">Succeed / 成功</label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input id="failure" name="result" type="radio" className="form-check-input me-2" checked={result === false} onChange={() => setResult(false)} required />
                                        <label className="form-check-label" htmlFor="failure">Failed / 失败</label>
                                    </div>
                                </div>
                            </div>
                        
                            {result === false && (
                                <div>
                                    <h5 className="mb-3">Replacement Parts / 替换零件</h5>
                                    {replacementParts.map((part, index) => (
                                        <div className="row g-3 mb-3 align-items-end" key={index}>
                                            <div className="col-5">
                                                <label htmlFor={`partName-${index}`} className="form-label">Part Name / 零件名称</label>
                                                <input type="text" className="form-control" id={`partName-${index}`} value={part.partName} onChange={(e) => handlePartChange(index, "partName", e.target.value)} />
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor={`quantity-${index}`} className="form-label">Quantity / 数量</label>
                                                <input type="number" className="form-control" id={`quantity-${index}`} value={part.quantity} onChange={(e) => handlePartChange(index, "quantity", e.target.value)} />
                                            </div>
                                            <div className="col-3">
                                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteRow(index)} disabled={replacementParts.length === 1}>Delete / 删除</button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary mb-3" onClick={handleAddRow}>Add More Rows / 添加更多行</button>
                                </div>
                            )}

                            <hr className="my-4"/>
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Submit 提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};