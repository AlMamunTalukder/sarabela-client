export const getEnglishCategory = (searchCategory: string): string => {
    // Trim the string to remove any unwanted spaces
    const trimmedCategory = searchCategory.trim();
  
    switch (trimmedCategory) {
      case "আর্ন্তজাতিক":
        return "/international";
      case "শিক্ষা":
        return "/education";
      case "রাজনীতি":
        return "/politics";
      case "অর্থনীতি":
        return "/economy";
      case "বিনোদন":
        return "/entertainment";
      case "স্বাস্থ্য":
        return "/health";
      case "জাতীয়":
        return "/national";
      case "ধর্ম ও ইসলাম":
        return "/religion";
      case "তথ্য ও প্রযুক্তি":
        return "/technology";
      case "ভ্রমণ ও পর্যটন":
        return "/tourism";
      case "খেলাধুলা":
        return "/sports";
      default:
        return "general";
    }
  };
  