import { PrismaClient } from "@prisma/client";

const talukasByDistrict: Record<
  string,
  string[]
> = {
  panchmahal: [
    "Godhra",
    "Halol",
    "Kalol",
    "Jambughoda",
    "Ghoghamba",
    "Shehera",
    "Morva Hadaf",
    "Kothamba",
  ],

  ahmedabad: [
    "Ahmedabad",
    "Bavla",
    "Daskroi",
    "Detroj-Rampura",
    "Dhandhuka",
    "Dholera",
    "Dholka",
    "Mandal",
    "Sanand",
    "Viramgam",
  ],

  amreli: [
    "Amreli",
    "Babra",
    "Bagasara",
    "Dhari",
    "Jafrabad",
    "Khambha",
    "Kunkavav Vadia",
    "Lathi",
    "Lilia",
    "Rajula",
    "Savarkundla",
  ],

  anand: [
    "Anand",
    "Anklav",
    "Borsad",
    "Khambhat",
    "Petlad",
    "Sojitra",
    "Tarapur",
    "Umreth",
  ],

  aravalli: [
    "Bayad",
    "Bhiloda",
    "Dhansura",
    "Malpur",
    "Meghraj",
    "Modasa",
    "Shamlaji",
    "Sathamba",
  ],

  banaskantha: [
    "Amirgadh",
    "Bhabhar",
    "Danta",
    "Dantiwada",
    "Deesa",
    "Deodar",
    "Hadad",
    "Kankrej",
    "Lakhani",
    "Palanpur",
    "Rah",
    "Suigam",
    "Tharad",
    "Vav",
  ],

  bharuch: [
    "Amod",
    "Ankleshwar",
    "Bharuch",
    "Hansot",
    "Jambusar",
    "Jhagadia",
    "Netrang",
    "Valia",
  ],

  bhavnagar: [
    "Bhavnagar",
    "Gariadhar",
    "Ghogha",
    "Jesar",
    "Mahuva",
    "Palitana",
    "Sihor",
    "Talaja",
    "Umrala",
    "Vallabhipur",
    "Gadhada",
  ],

  botad: [
    "Botad",
    "Barwala",
    "Gadhada",
  ],

  "chhota-udaipur": [
    "Chhota Udaipur",
    "Bodeli",
    "Jetpur Pavi",
    "Kavant",
    "Nasvadi",
    "Sankheda",
    "Kadval",
  ],

  dahod: [
    "Dahod",
    "Devgadh Baria",
    "Dhanpur",
    "Fatepura",
    "Garbada",
    "Jhalod",
    "Limkheda",
    "Sanjeli",
    "Sukhsar",
  ],

  dang: [
    "Ahwa",
    "Subir",
    "Waghai",
  ],

  "devbhoomi-dwarka": [
    "Bhanvad",
    "Kalyanpur",
    "Khambhalia",
    "Okhamandal",
  ],

  gandhinagar: [
    "Dehgam",
    "Gandhinagar",
    "Kalol",
    "Mansa",
  ],

  "gir-somnath": [
    "Gir Gadhada",
    "Kodinar",
    "Patan-Veraval",
    "Sutrapada",
    "Talala",
    "Una",
  ],

  jamnagar: [
    "Dhrol",
    "Jamnagar",
    "Jodiya",
    "Kalavad",
    "Lalpur",
  ],

  junagadh: [
    "Bhesan",
    "Junagadh",
    "Keshod",
    "Malia",
    "Manavadar",
    "Mangrol",
    "Mendarda",
    "Vanthali",
    "Visavadar",
  ],

  kheda: [
    "Balasinor",
    "Kapadvanj",
    "Kathlal",
    "Kheda",
    "Mahudha",
    "Matar",
    "Mehmedabad",
    "Nadiad",
    "Thasra",
    "Vaso",
    "Fagvel",
  ],

  kutch: [
    "Abdasa",
    "Anjar",
    "Bhachau",
    "Bhuj",
    "Gandhidham",
    "Lakhpat",
    "Mandvi",
    "Mundra",
    "Nakhatrana",
    "Rapar",
  ],

  mahisagar: [
    "Balasinor",
    "Kadana",
    "Khanpur",
    "Lunawada",
    "Santrampur",
    "Shehera",
    "Virpur",
    "Godhar",
  ],

  mehsana: [
    "Becharaji",
    "Jotana",
    "Kadi",
    "Kheralu",
    "Mehsana",
    "Satlasana",
    "Unjha",
    "Vadnagar",
    "Vijapur",
    "Visnagar",
  ],

  morbi: [
    "Halvad",
    "Maliya",
    "Morbi",
    "Tankara",
    "Wankaner",
  ],

  narmada: [
    "Dediapada",
    "Garudeshwar",
    "Nandod",
    "Sagbara",
    "Tilakwada",
    "Chikda",
  ],

  navsari: [
    "Chikhli",
    "Gandevi",
    "Jalalpore",
    "Khergam",
    "Navsari",
    "Vansda",
  ],

  patan: [
    "Chanasma",
    "Harij",
    "Patan",
    "Radhanpur",
    "Sami",
    "Santalpur",
    "Siddhpur",
  ],

  porbandar: [
    "Kutiyana",
    "Porbandar",
    "Ranavav",
  ],

  rajkot: [
    "Dhoraji",
    "Gondal",
    "Jamkandorna",
    "Jasdan",
    "Jetpur",
    "Kotada Sangani",
    "Lodhika",
    "Paddhari",
    "Rajkot",
    "Upleta",
    "Vinchhiya",
  ],

  sabarkantha: [
    "Himatnagar",
    "Idar",
    "Khedbrahma",
    "Poshina",
    "Prantij",
    "Talod",
    "Vadali",
    "Vijaynagar",
  ],

  surat: [
    "Bardoli",
    "Choryasi",
    "Kamrej",
    "Mahuva",
    "Mandvi",
    "Mangrol",
    "Olpad",
    "Palsana",
    "Surat",
    "Umarpada",
    "Areth",
    "Ambika",
  ],

  surendranagar: [
    "Chotila",
    "Chuda",
    "Dasada",
    "Dhrangadhra",
    "Lakhtar",
    "Limbdi",
    "Muli",
    "Sayla",
    "Thangadh",
    "Wadhwan",
  ],

  tapi: [
    "Dolvan",
    "Nizar",
    "Songadh",
    "Uchhal",
    "Valod",
    "Vyara",
    "Kukarmunda",
    "Ukai",
  ],

  vadodara: [
    "Dabhoi",
    "Desar",
    "Karjan",
    "Padra",
    "Savli",
    "Sinor",
    "Vadodara",
    "Waghodia",
  ],

  valsad: [
    "Dharampur",
    "Kaprada",
    "Pardi",
    "Umbergaon",
    "Valsad",
    "Vapi",
    "Nana Pondha",
  ],

  "vav-tharad": [
    "Bhabhar",
    "Deodar",
    "Dharnidhar",
    "Lakhani",
    "Rah",
    "Suigam",
    "Tharad",
    "Vav",
  ],
};

function slugify(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function seedTalukas(
  prisma: PrismaClient
) {
  console.log(
    "🌍 Seeding Gujarat Talukas..."
  );

  let total = 0;

  for (const [
    districtSlug,
    talukaNames,
  ] of Object.entries(
    talukasByDistrict
  )) {
    const district =
      await prisma.district.findUnique({
        where: {
          slug: districtSlug,
        },
      });

    if (!district) {
      console.warn(
        `⚠️ District not found: ${districtSlug}`
      );

      continue;
    }

    for (const name of talukaNames) {
      const slug = slugify(name);

      await prisma.taluka.upsert({
        where: {
          slug,
        },

        update: {
          name,
          districtId: district.id,
        },

        create: {
          name,
          slug,
          districtId: district.id,
        },
      });

      total++;
    }
  }

  console.log(
    `✅ ${total} Gujarat talukas seeded.`
  );
}