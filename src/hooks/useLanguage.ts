import { useState, useCallback, useEffect } from "react";

type Language = "ar" | "en";

const translations: Record<string, Record<Language, string>> = {
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  projects: { ar: "المشاريع", en: "Projects" },
  analysis: { ar: "تحليل BOQ", en: "BOQ Analysis" },
  contractors: { ar: "المقاولين", en: "Contractors" },
  settings: { ar: "الإعدادات", en: "Settings" },
  totalProjects: { ar: "إجمالي المشاريع", en: "Total Projects" },
  totalValue: { ar: "القيمة الإجمالية", en: "Total Value" },
  totalItems: { ar: "إجمالي البنود", en: "Total Items" },
  activeProjects: { ar: "مشاريع نشطة", en: "Active Projects" },
  recentProjects: { ar: "المشاريع الأخيرة", en: "Recent Projects" },
  projectName: { ar: "اسم المشروع", en: "Project Name" },
  status: { ar: "الحالة", en: "Status" },
  value: { ar: "القيمة", en: "Value" },
  date: { ar: "التاريخ", en: "Date" },
  active: { ar: "نشط", en: "Active" },
  completed: { ar: "مكتمل", en: "Completed" },
  pending: { ar: "معلق", en: "Pending" },
  cancelled: { ar: "ملغي", en: "Cancelled" },
  upload: { ar: "رفع الملف", en: "Upload File" },
  uploadDesc: { ar: "اسحب الملف هنا أو اضغط للاختيار", en: "Drag file here or click to browse" },
  extract: { ar: "استخراج", en: "Extract" },
  analyze: { ar: "تحليل", en: "Analyze" },
  wbs: { ar: "WBS", en: "WBS" },
  export: { ar: "تصدير", en: "Export" },
  itemNo: { ar: "رقم البند", en: "Item No" },
  description: { ar: "الوصف", en: "Description" },
  unit: { ar: "الوحدة", en: "Unit" },
  quantity: { ar: "الكمية", en: "Quantity" },
  unitPrice: { ar: "سعر الوحدة", en: "Unit Price" },
  totalPrice: { ar: "السعر الإجمالي", en: "Total Price" },
  category: { ar: "التصنيف", en: "Category" },
  noData: { ar: "لا توجد بيانات", en: "No data" },
  addProject: { ar: "إضافة مشروع", en: "Add Project" },
  searchProjects: { ar: "البحث في المشاريع", en: "Search Projects" },
  allStatuses: { ar: "جميع الحالات", en: "All Statuses" },
  language: { ar: "اللغة", en: "Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
  theme: { ar: "المظهر", en: "Theme" },
  categoryDistribution: { ar: "توزيع التصنيفات", en: "Category Distribution" },
  valueChart: { ar: "مخطط القيم", en: "Value Chart" },
  workflowStatus: { ar: "حالة سير العمل", en: "Workflow Status" },
  startAnalysis: { ar: "بدء التحليل", en: "Start Analysis" },
  analysisResults: { ar: "نتائج التحليل", en: "Analysis Results" },
  client: { ar: "العميل", en: "Client" },
  location: { ar: "الموقع", en: "Location" },
  budget: { ar: "الميزانية", en: "Budget" },
  progress: { ar: "التقدم", en: "Progress" },
  actions: { ar: "الإجراءات", en: "Actions" },
  view: { ar: "عرض", en: "View" },
  edit: { ar: "تعديل", en: "Edit" },
  delete: { ar: "حذف", en: "Delete" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  projectManagement: { ar: "نظام إدارة المشاريع", en: "Project Management System" },
  pms: { ar: "PMS", en: "PMS" },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("pms-language") as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("pms-language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key;
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const isRTL = language === "ar";

  return { language, setLanguage, t, toggleLanguage, isRTL };
}
