import StatsPanel from "@/components/cards/stats-panel"
import LocaleManager from "@/components/screens/locale-manager"

const AdminLandingPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Admin Landing Page</h1>
      <section className='mt-4'> <StatsPanel /> </section>
      <section className='mt-6'> <LocaleManager /> </section>
    </div>
  )
}

export default AdminLandingPage