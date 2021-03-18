import buttons from '../utils/buttons.text'
import React, { state, useState } from 'react';

function productEditor(){

    const [editMode, setEditMode] = useState(false)

    function changeEditMode(enabled){
        setEditMode(enabled)
    }

    return(
        <div>
            <div
                className="
                bg-dark font-simp
                border-dark shadow-lg rounded-md
                mx-4 md:m-auto p-2 border-4
                ">
                <img
                    className="block m-auto rounded-md object-cover"
                    src='https://cdn.shopify.com/s/files/1/0065/2535/4073/products/SOC-GX-93-SB-Arcadia-TV-Ver.-03_900x.jpg?v=1610142906'
                    alt=""/>
                <form>
                    <div className="grid grid-cols-2 gap-4 w-full h-full pt-2">
                        
                        <div className='border border-pale border-opacity-25 p-2'>
                            <div className='text-pale'>
                                {buttons.productFields.productPrice.text}
                            </div>
                            <input
                                className="border-2 border-dark"
                                disabled = {!editMode}                              
                            />
                        </div>
                        
                        <div className='border border-pale border-opacity-25 p-2'>
                            <div className='text-pale'>
                                {buttons.productFields.piecesNumber.text}
                            </div>
                            <input
                                className="border-2 border-dark"
                                disabled = {!editMode}                                
                            />  
                        </div>

                        <div className='border border-pale border-opacity-25 p-2'>
                            <div className='text-pale'>
                                {buttons.productFields.aviablePieces.text}
                            </div>
                            
                            <input
                                className="border-2 border-dark"
                                disabled = {!editMode}
                            />
                        </div>
                        
                        <div className='border border-pale border-opacity-25 p-2'>
                            <div className='text-pale'>
                                {buttons.productFields.code.text}
                            </div>
                            <input
                                className="border-2 border-dark"
                                disabled = {!editMode}
                            />
                        </div>
                       
                        <div>
                            <div className="text-lg text-pale font-bold">
                                {buttons.productFields.blockSale.text}
                            </div>
                            <input
                                className="w-5 h-5 bg-dark"
                                type="checkbox"
                                disabled = {!editMode}
                            />
                        </div>
                    </div>
                 {
                     toggleEditMode(changeEditMode, editMode)
                 }      
                                                    
                </form>
            </div>
        </div>       
        
    )
}

function toggleEditMode(callback, enabled){
    if(enabled){
        return (
            <div className='flex justify-center items-stretch gap-3'>
                <div>
                    <button className="button-red w-24 h-12">{buttons.productFields.applyChanges.text}</button>
                </div>
                <div>
                    <button onClick={
                        function (event){
                            event.preventDefault()
                            callback(false)
                        }
                    } className="button-red w-24 h-12">{buttons.productFields.cancel.text}</button>
                </div>      
            </div>     
        ) 
    }else{
        return(
            <div className='flex justify-center'>
                <button onClick={
                    function (event){
                        event.preventDefault()
                        callback(true)
                    }
                } className="button-red w-24 h-12">{buttons.productFields.editProduct.text}</button>
            </div> 
        )
    }
    
}



export default productEditor