
import Blogs from "../components/Blogs"
function Home() {
  return (
    <div className="h-screen">
        <div className="bg-slate-200 flex justify-center items-center">
            ⭐️ Get unlimited access to the best of medium for less than $1/week. Become a member
        </div>
        <div className="p-28">
            <Blogs />
        </div>
    </div>
  )
}

export default Home
