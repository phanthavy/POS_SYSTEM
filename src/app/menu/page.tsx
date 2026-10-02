import Menu from "@/src/views/Menu";
import SidebarOrder from "@/src/views/SidebarOrder";

function Page() {
  return (
    <div className="flex flex-1 min-w-0">
      <div className="flex-1 min-w-0">
        <Menu />
      </div>
      <SidebarOrder />
    </div>
  );
}
export default Page;
