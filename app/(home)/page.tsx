export default function Home() {
  return (
    <main>
      <div className="fixed z-0 top-[70px] left-0 sm:left-[100px] right-0 h-[40px] bg-orange-300">
        Tabs
      </div>
      <div className="mt-[40px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <div>Vid 1</div>
        <div>Vid 2</div>
        <div>Vid 3</div>
      </div>
    </main>
  )
}
