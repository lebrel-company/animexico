'use strict';
// libraries:
import {useState, useEffect} from 'react'
import {useLazyQuery, useQuery} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import ME from '../operations/queryMe.gql'

var pp = (el) => console.log(el)

//==============================================================================

export function useMe() {
    let [me, setMe] = useState({})
    let {loading, error, data} = useQuery(ME)

    if (!loading && !error && data ) return {loading: false, me: data.me.me}

    return {loading: true, me: {}}

}