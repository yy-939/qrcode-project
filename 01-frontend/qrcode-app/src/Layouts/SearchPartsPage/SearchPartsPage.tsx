import React, { useState, useEffect } from 'react';
import PartModel from '../../Models/PartModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { Pagination } from '../Utils/Pagination';
import { SearchPart } from './Components/SearchPart';

export const SearchPartsPage = () => {
    const [parts, setParts] = useState<PartModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [partsPerPage, setpartsPerPage] = useState(5);
    const [totalAmountParts, setTotalAmountParts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('partId');  // default: partId
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(()=>{
        const fetchParts = async() => {
            const baseURL: string = "http://localhost:8080/machine-parts";

            // const url: string = `${baseURL}?page=${currPage-1}&size=${partsPerPage}`;
            let url: string = '';
            if (searchUrl === '') {
                url = `${baseURL}?page=${currPage - 1}&size=${partsPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber', `${currPage-1}`)
                url = baseURL + searchWithPage;
            }

            console.log('Fetching URL:', url);

            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.machineParts;

            setTotalAmountParts(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedParts : PartModel[] = [];
            for (const key in responseData){
                loadedParts.push({
                    id : responseData[key].id,
                    partId : responseData[key].partId,
                    englishName : responseData[key].englishName,
                    chineseName: responseData[key].chineseName,
                    img : responseData[key].img
                })
            }
            setParts(loadedParts );
            setIsLoading(false);
        };
        fetchParts().catch((error: any) => {
            console.error('Fetch error:', error);
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); // scroll page to the top

    }, [currPage, searchUrl]) // each time currPage/searchURL changes, recall this hook

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

    // pagination - url change
    const searchHandleChange = () => {
        setCurrPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            let searchPath;
            switch (searchType) {
                case 'partId':
                    searchPath = `/search/findByPartId?partId=${search}&page=${currPage - 1}&size=${partsPerPage}`;
                    break;
                case 'englishName':
                    searchPath = `/search/findByEnglishNameContaining?englishName=${search}&page=${currPage - 1}&size=${partsPerPage}`;
                    break;
                case 'chineseName':
                    searchPath = `/search/findByChineseNameContaining?chineseName=${search}&page=${currPage - 1}&size=${partsPerPage}`;
                    break;
                default:
                    searchPath = '';
            }
            setSearchUrl(searchPath);
        }
    }

    const indexOfLastPart : number = currPage * partsPerPage;
    const indexOfFirstPart: number = indexOfLastPart - partsPerPage;
    let lastItem = partsPerPage * currPage <= totalAmountParts ?
        partsPerPage * currPage : totalAmountParts;

    const paginate = (pageNumber: number) => setCurrPage(pageNumber); 

    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <input className='form-control me-2' type='search'
                                placeholder='Search' aria-labelledby='Search'
                                onChange={e => setSearch(e.target.value)} />
                            <button className='btn btn-outline-success'
                                onClick={searchHandleChange}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='col-4'>
                        <select className='form-control' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="partId">Part ID</option>
                            <option value="englishName">English Name</option>
                            <option value="chineseName">Chinese Name</option>
                        </select>
                    </div>
                </div>
                {totalAmountParts > 0 ?
                    <>
                        <div className='mt-3'>
                            <h5>Number of results: ({totalAmountParts})</h5>
                        </div>
                        <p>
                            {indexOfFirstPart + 1} to {lastItem} of {totalAmountParts} items:
                        </p>
                        {parts.map(part => (
                            <SearchPart part={part} key={part.id} />
                        ))}
                    </>
                    :
                    <div className='m-5'>
                        <h3>
                            No matching result.
                        </h3>
                    </div>
                }
                {totalPages > 1 &&
                    <Pagination currentPage={currPage} totalPages={totalPages} paginate={paginate} />
                }
            </div>
        </div>
    );
};