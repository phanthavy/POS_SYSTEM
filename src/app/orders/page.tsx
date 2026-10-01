import Order from "@/src/views/Order";
import SidebarOrder from "@/src/views/SidebarOrder";
function page() {
  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <Order />
      </div>
      <SidebarOrder />
    </div>
  );
}
export default page;
