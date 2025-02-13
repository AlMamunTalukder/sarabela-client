export const getCategory = (basePath: string = "national"): string => {
  switch (basePath) {
    case "/international":
      return "আর্ন্তজাতিক";
    case "/education":
      return "শিক্ষা";
    case "/politics":
      return "রাজনীতি";
    case "/economy":
      return "অর্থনীতি";
    case "/entertainment":
      return "বিনোদন";
    case "/health":
      return "স্বাস্থ্য";
    case "/national":
      return "জাতীয়";
    case "/religion":
      return "ধর্ম ও ইসলাম";
    case "/technology":
      return "তথ্য ও প্রযুক্তি";
    case "/tourism":
      return "ভ্রমণ ও পর্যটন";
    case "/sports":
      return "খেলাধুলা";
    default:
      return "national";
  }
};
