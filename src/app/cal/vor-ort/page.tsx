import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = {
  title: "ADN KI-Transformation | Training vor Ort in Bochum buchen",
  description:
    "Termine buchen für das ADN KI-Training vor Ort in Bochum mit yesterday.",
};

export default function CalVorOrtPage() {
  return <BookingPage variant="vor-ort" provider="cal" />;
}
