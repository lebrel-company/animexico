function Card(props) {
    return (
        <div>
            <div
                className="card-product">
                <img
                    className={`
                     md:w-72 h-72 block m-auto rounded-md object-cover
                    `}
                    src={props.image}
                    alt=""/>
                <div className="flex flex-row mx-4 my-2 font-bold">
                    <div className="flex-1">
                        <h3 className="text-lg">{props.name}</h3>
                        <p className="">{'$' + props.price + ' MXN'}</p>
                    </div>
                    <button className="button-add">
                        {texts.addToCart.title}
                    </button>
                </div>
            </div>
        </div>
    )
}

var texts = {
    addToCart: {
        title: 'agregar',
    },
}

export default Card