//layouts:
import AdministratorLayout from "../../layout/Admin";
import ProductEditor from '../../components/productEditor'

export default function Admin(){
    return(
        <AdministratorLayout>
            <ProductEditor/>
            <ProductEditor/>
            <ProductEditor/>
            <ProductEditor/>
            <ProductEditor/>
        </AdministratorLayout>
    )
}