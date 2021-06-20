// libraries:
import {useRouter} from 'next/router'
import Link from 'next/link';
import {useQuery, gql} from '@apollo/client'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Card from '../../components/Card'
import Loading from '../../components/loading';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import QUERY_ALL_AVAILABLE_PRODUCTS
    from '../../operations/queryProducts.gql'
//==============================================================================

export default function Store() {
    var {loading, error, data} = useQuery(QUERY_ALL_AVAILABLE_PRODUCTS)


    if (loading) return <Loading/>
    if (error) return `Error!: ${error.message}`

    return (
        <ClientLayout pattern={`bg-circles`}>
            <div className={`flex justify-center w-full h-full`}>
                <div>

                    <div
                        className="
                        py-20 grid md:grid-cols-3  lg:grid-cols-4 gap-10
                        container m-auto
                        "
                    >
                        {
                            data.queryAllAvailableProducts.map(
                                function _query(_p) {
                                    return (
                                        <Card
                                            key={_p.id}
                                            product={_p}
                                            scrollableInnerImages={true}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

