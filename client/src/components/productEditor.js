import buttons from '../utils/buttons.text'

function productEditor(){
    return(
        <div className="w-full">
             <div className='w-full h-min-64 grid grid-cols-7 gap-4'> 
                <div className="border-4 rounded-lg"></div>
                <div className="col-span-6 grid grid-cols-6 border-2 h-60 font-simp text-2xl">
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.productPrice.text}</div>
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.piecesNumber.text}</div>
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.aviablePieces.text}</div>
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.code.text}</div>
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.blockSale.text}</div>
                    <div className="bg-dark col-1 h-14 text-white flex justify-center">{buttons.productFields.deleteProduct.text}</div>      
                       
                </div>  
            </div>
        </div>
       
        
    )
}

export default productEditor