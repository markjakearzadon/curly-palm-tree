import GroupList from "./components/GroupList";

export default function Home() {
  return (
    <div className="col-span-5 md:col-span-3 bg-blue-100 overflow-auto">
      <div className="block md:hidden">
        <GroupList />
      </div>
    </div>
  )
}
