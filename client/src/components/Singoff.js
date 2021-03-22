'use strict';
// libraries:
import {useQuery, gql} from '@apollo/client'
import {useRouter} from 'next/router'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


const QUERY_USER_INFO = gql`
    query queryUserInfo{
        queryUserInfo{
            id
            name
            lastname
            middleName
            lastname
            secondLastname
            email
            birthday
            cellphone
            address{
                city
                state
                country
                zipcode
                suburb
                street
                buildingNumber
                apartmentNumber
            }
        }
    }
`;


const SingoffButton = () => {


    const router = useRouter();

    const {data, loading, error} = useQuery(QUERY_USER_INFO);
    console.log(data)
    console.log(loading)
    console.log(error)

    if (loading) return null;


    //if there is not data
    if (!data) {
        return router.push('/login');
    }

    const {name, lastname} = data.queryUserInfo

    const SingOff = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div>
            <button
                onClick={() => SingOff()}
            >
                {text.ButtonName}
            </button>

        </div>
    )
}


var text = {
    ButtonName: 'Cerrar Sesión',
}


export default SingoffButton
