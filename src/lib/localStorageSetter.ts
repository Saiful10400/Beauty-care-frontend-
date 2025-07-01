import { tProduct } from "@/types"

const cartProductLocalStorageSetter=(product:tProduct)=>{

    // localStorage.setItem("products",JSON.stringify({hi:30}))

    console.log(JSON.parse(localStorage.getItem("products") as string))

}


export default cartProductLocalStorageSetter