import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
