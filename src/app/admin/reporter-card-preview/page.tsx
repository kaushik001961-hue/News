import ReporterIdCardV5 from "@/components/Reporter/v5/ReporterIdCardV5";

const reporter = {
  reporterId: "AGS-REP-2026-0001",
  firstName: "Jalpesh",
  middleName: "B",
  lastName: "Bhatt",
  designation: "Senior Reporter",

  phone: "9876543210",
  email: "jalpesh@agsnews.in",

  district: "Ahmedabad",
  state: "Gujarat",

  bloodGroup: "O+",
  dob: "15/08/1990",

  beat: "Politics",
  coverageArea: "North Gujarat",

  qualification: "B.Com",

  experience: 8,

  emergencyName: "Kaushik Bhatt",
  emergencyPhone: "9999999999",

  photo: "/sample-reporter.jpg",

  barcode: "AGS-REP-2026-0001",

  qrCode: "https://agsnews.in/verify/AGS-REP-2026-0001",

  issueDate: "01/01/2026",
  expiryDate: "31/12/2026",
    hasBike: false,
  hasCar: false,

  authority: "Editor In Chief",
  
};

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-200 p-10">
      <ReporterIdCardV5 reporter={reporter} />
    </div>
  );
}