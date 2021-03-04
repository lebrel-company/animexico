function queryMapOfAddresses(parent, args, context, info){
    console.log(parent)
    return 'Hello'
}


export default {
    Query: {
        queryMapOfAddresses
    }
}
