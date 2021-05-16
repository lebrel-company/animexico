// libraries:
import {useRouter} from 'next/router'
import Link from 'next/link';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import ClientLayout from '../../layout/Client';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Card from '../../components/Card'
import Footer from '../../components/Footer';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


function Homepage() {
    return (
        <ClientLayout pattern={`bg-circles`}>
            <div className={`flex justify-center w-full h-full`}>
                <div>

                    <div
                        className="
                        py-20 grid md:grid-cols-2  lg:grid-cols-3 gap-10
                        "
                    >
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000012161_Gxr51siy_05_900x.jpg?v=1610144452"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013312_LclgAvZO_12_300x.jpg?v=1610152217"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013366_e7UQ33wD_04.jpg?v=1610951550"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013333_rsqWpdMA_01.jpg?v=1610985628D"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/SOC-GX-93-SB-Arcadia-TV-Ver.-03_900x.jpg?v=1610142906"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000012161_Gxr51siy_05_900x.jpg?v=1610144452"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013312_LclgAvZO_12_300x.jpg?v=1610152217"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/item_0000013366_e7UQ33wD_04.jpg?v=1610951550"
                        />
                        <Card
                            name="Godzilla"
                            price={200}
                            image="https://cdn.shopify.com/s/files/1/0065/2535/4073/products/SOC-GX-93-SB-Arcadia-TV-Ver.-03_900x.jpg?v=1610142906"
                        />

                    </div>
                </div>


            </div>
        </ClientLayout>
    )
}


export default Homepage;