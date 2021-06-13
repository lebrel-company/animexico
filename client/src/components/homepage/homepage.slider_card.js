export default function HomepageSlider_card(props) {
    let _p = props.product
    return (
        <div>
            <div
                className="card-product">
                <div className={`bg-cross absolute z-20 w-full h-full`}/>
                <div className={`relative z-30`}>
                    <div className={`w-72 my-4 px-6`}>
                        <img
                            src={_p.listOfImages[0]}
                            className={`object-contain`}
                        />
                    </div>
                    <div className="flex flex-row mx-4 my-2 font-bold">
                        <div className="flex-1">
                            <div className="text-lg">{_p.name}</div>
                            <p className="">
                                {`\$${_p.price.amount} ${_p.price.currency}`}
                            </p>
                        </div>
                        <button className="button-add">
                            {texts.addToCart.title}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
