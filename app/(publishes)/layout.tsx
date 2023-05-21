import SideBar from "@/components/nav/SideBar"
import ContentTabs from "./ContentTabs"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden w-[100px] fixed top-[70px] bottom-0 bg-white py-5 px-2 sm:block overflow-y-auto">
        <SideBar />
      </div>

      <main>
        <div className="fixed z-10 top-[70px] left-0 sm:left-[116px] right-0 h-[40px] bg-white">
          <div className="h-full py-4 px-2 w-full overflow-x-auto scrollbar-hide">
            <div className="h-full w-max flex items-center gap-x-2 sm:gap-x-4">
              <ContentTabs />
            </div>
          </div>
        </div>
        <div className="mt-[40px] py-2 sm:px-4 sm:ml-[100px]">{children}</div>
      </main>
    </>
  )
}
