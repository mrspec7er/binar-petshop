import { useState } from "react";
import categories from "./categories.json";

const FormAdopt = () => {
    const [errMsg, setErrMsg] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [race, setRace] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(age);
        console.log(race);
        console.log(category);
        console.log(e.target[4].files[0]);
        
    }

    const imagePreview = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    }
    return ( 
        <div className="grid justify-center h-max min-h-screen py-10 bg-orange-50">
            <div className="h-fit w-[70vw] md:w-[30vw]">
                <h1 className="text-center text-2xl font-bold">Adoption</h1>
                {errMsg && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg}</h1>}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-12 gap-12 md:gap-10">
                    <input onChange={(e) => setName(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="Name..." />
                    <input onChange={(e) => setAge(e.target.value)} className="border-2 h-12 rounded-md" type="number" placeholder="Age" />
                    <input onChange={(e) => setRace(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="Race..." />
                    <select onChange={(e) => setCategory(e.target.value)} className="border-2 h-12 rounded-md">
                        {categories.map(item => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <label className="block ml-auto mr-auto">
                        <span className="sr-only">Choose image</span>
                        <input onChange={(e) => imagePreview(e.target.files[0])} type="file" className="block w-full text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-violet-700
                        hover:file:bg-violet-100
                        " multiple />
                    </label>
                    {previewImage && <img src={`${previewImage}`} />}
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-3 self-center w-28 rounded-md font-bold">Submit</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default FormAdopt;