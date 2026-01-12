import Footer from "@/components/global/footer"
import Navbar from "@/components/global/navbar"
import { ReactNode } from "react"


const WrappedLayout = ({children}:{children: ReactNode}) => {
  return (
    <>
    <Navbar />
      {children}
    <Footer />
    </>
  )
}

export default WrappedLayout
