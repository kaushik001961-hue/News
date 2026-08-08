import { redirect } from "next/navigation";

export default function ReviewPage() {
  redirect("/editor/news?status=PENDING");
}