import * as XLSX from "xlsx";
import type { BOQItem } from "@/components/AnalysisResults";

export async function parseExcelFile(file: File): Promise<BOQItem[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  if (rows.length < 2) return [];

  // Try to detect header row
  const headerRow = rows[0].map((h: any) => String(h || "").toLowerCase().trim());

  const descIdx = headerRow.findIndex((h) => h.includes("desc") || h.includes("وصف") || h.includes("بند"));
  const unitIdx = headerRow.findIndex((h) => h.includes("unit") || h.includes("وحد"));
  const qtyIdx = headerRow.findIndex((h) => h.includes("qty") || h.includes("quantity") || h.includes("كمي"));
  const priceIdx = headerRow.findIndex((h) => h.includes("price") || h.includes("rate") || h.includes("سعر"));

  const categories = [
    "أعمال خرسانية",
    "أعمال كهربائية",
    "أعمال ميكانيكية",
    "تشطيبات",
    "أعمال ترابية",
  ];

  const items: BOQItem[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 3) continue;

    const description = String(row[descIdx >= 0 ? descIdx : 1] || "").trim();
    if (!description) continue;

    const unit = String(row[unitIdx >= 0 ? unitIdx : 2] || "m²");
    const quantity = Number(row[qtyIdx >= 0 ? qtyIdx : 3]) || 0;
    const unitPrice = Number(row[priceIdx >= 0 ? priceIdx : 4]) || 0;

    items.push({
      itemNo: String(i),
      description,
      unit,
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice,
      category: guessCategory(description, categories),
    });
  }

  return items;
}

function guessCategory(desc: string, categories: string[]): string {
  const lower = desc.toLowerCase();
  if (lower.includes("concrete") || lower.includes("خرسان")) return categories[0];
  if (lower.includes("electric") || lower.includes("كهرب")) return categories[1];
  if (lower.includes("mechanic") || lower.includes("ميكانيك") || lower.includes("hvac") || lower.includes("تكييف")) return categories[2];
  if (lower.includes("finish") || lower.includes("paint") || lower.includes("تشطيب") || lower.includes("دهان") || lower.includes("بلاط")) return categories[3];
  if (lower.includes("earth") || lower.includes("excavat") || lower.includes("حفر") || lower.includes("تراب") || lower.includes("ردم")) return categories[4];
  return categories[Math.floor(Math.random() * categories.length)];
}
