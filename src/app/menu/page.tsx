import Menu from "@/src/views/Menu";
import SidebarOrder from "@/src/views/SidebarOrder";

function page() {
  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <Menu />
      </div>
      <SidebarOrder />
    </div>
  );
}
export default page;
