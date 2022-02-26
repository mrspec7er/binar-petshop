import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"
import {BiEdit} from 'react-icons/bi';
import {FiTrash2} from 'react-icons/fi';

const base_url = process.env.REACT_APP_BASE_URL;

const AdminCategory = () => {
    let i = 1;
    const navigate = useNavigate();
    const userData = useSelector(state => state.loginReducer);
    const [changes, setChanges] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetch(`${base_url}/categories?title=${keyword}`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setCategory(result.data)
        })
    }, [base_url, changes, keyword])

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const handleDelete = (id) => {

        fetch(`${base_url}/admin/v1/categories/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        }).then(() =>{
            setChanges(current => current + 1)
        })

    }
    return (
        <div className="h-screen w-full flex flex-col">
            <NavbarLayout/>
            <div className="flex bg-orange-50">
                <SidebarLayout/>
                <div className="flex-grow my-4 md:mx-20 mx-4 min-h-screen py-5">
                    <p className="font-bold md:text-2xl text-lg text-center pt-2 mb-6 ">Category Data</p>
                    <div className='mt-6 flex justify-between items-center mb-4'>
                        <section className="basis-24">
                            {/* <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-300  rounded-md md:text-base font-bold text-sm border border-slate-400'>Category</button>
                            <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                <ul className="text-gray-800 m-2 md:pb-1">
                                    <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleClickAll()}>All Product</button></li>
                                    {tags.map(item =>(
                                        <li key={item.id}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleTagClick(item.name)}>{item.name}</button></li>
                                        ))}
                                </ul>
                            </div> */}
                        </section>
                        <div className='basis-1/2'>
                            <div className='col-end-12'>
                                <div className='flex'>
                                    <input onChange={handleChange} className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-400 rounded-full py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="search" name="search"/>
                                    <button className="flex items-center justify-center px-4 border-l -ml-14 hover:bg-gray-100 rounded-full ">
                                        <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button type="button" onClick={() => navigate('/admin/category/add')} className="bg-orange-200 p-3 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400">New Category</button>
                        </div>
                    </div>
                    <p className="font-bold mb-4">Total Data : {category.length}</p>
                    <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md">
                        <thead className="bg-orange-50">
                            <tr className="">
                                <th className="py-4 text-center">No.</th>
                                <th className="py-4 text-center">Name</th>
                                <th className="py-4 text-center">Updated At</th>
                                <th className="py-4 text-center">Deleted At</th>
                                <th className="py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-400">
                            {category?.length !== 0 && category?.map((item) => 
                            <tr key={item?.id} className="">
                                <td className="text-center">{i++}.</td>
                                <td className="text-center font-semibold">{item?.name}</td>
                                <td className="text-center">{new Date(item?.updatedAt).toLocaleString()}</td>
                                <td className="text-center">{new Date(item?.createdAt).toLocaleString()}</td>
                                <td className="py-3">
                                    <div className="flex justify-center mb-2">
                                        <button onClick={() => navigate(`/admin/category/update/${item?.id}`)} type="button" name="update" className="py-2 font-bold w-32 bg-yellow-200 hover:bg-yellow-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300"><BiEdit className="mr-3"/>Update</button>
                                    </div>
                                    <div className="flex justify-center">
                                        <button onClick={() => handleDelete(item?.id)} name="delete" className="py-2 font-bold w-32  bg-red-200 hover:bg-red-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300" type="button"><FiTrash2 className="mr-3"/>Delete</button>
                                    </div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default AdminCategory;