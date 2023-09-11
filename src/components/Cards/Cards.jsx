import { useState } from "react";
import { useEffect } from "react";

const Cards = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);
    return (
        <div>
            <form className='flex justify-center my-5'>
                <div className="form-control w-full max-w-xs">
                    <input
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        type="text"
                        placeholder="Search Item"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
            </form>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {
                    items.filter((item) => {
                        return search === '' ?
                            item
                            :
                            item.name.toLowerCase().includes(search)
                    }).map((item, ind) => (
                        <div key={ind} className="card card-compact  bg-base-100 shadow-xl mx-3">
                            <figure><img src={item.image_url} className="w-16" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p className="text-blue-300">{item.tagline}</p>
                                <p>{item.description}</p>
                                <h3>Volume: <span>{item.volume.value} {item.volume.unit}</span></h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Cards;