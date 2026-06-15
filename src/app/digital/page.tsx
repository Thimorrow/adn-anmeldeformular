import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = {
  title: "ADN KI-Transformation | Remote-Training buchen",
  description:
    "Termine buchen für das Remote-KI-Training bei ADN mit yesterday.",
};

export default function DigitalPage() {
  return <BookingPage variant="digital" provider="cal" />;
}
