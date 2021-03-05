function Card(props) {
    return (
        <div>
            <div
                className="
                bg-pale lg:w-80 font-simp
                border-dark shadow-lg rounded-md
                mx-4 md:m-auto p-2 border-4
                ">
                <img
                    className="md:w-72 h-72 block m-auto rounded-md object-cover"
                    src={props.image}
                    alt=""/>
                <div className='flex flex-row mx-4 my-2 font-bold'>
                    <div className="flex-1">
                        <h3 className="text-dark text-lg">{props.name}</h3>
                        <p className="text-gray-400">{'$' + props.price + ' MXN'}</p>
                    </div>
                    <button className='
                    m-auto font-bold border-2 text-red rounded-md px-2
                    hover:bg-red hover:text-pale
                    '>
                        add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card