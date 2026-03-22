import { redirect } from "next/navigation";

export default function AdminIndex() {
  // Directly point the generic /admin pathing deeply to /admin/bookings as the default Dashboard utility for MVP
  redirect("/admin/bookings");
}
