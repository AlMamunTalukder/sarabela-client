export type TNews = {
  _id: string;
  reporterName: string;
  videoUrl:string;
  reporterType: string;
  reportedDate: Date;
  newsType: string;
  division: string;
  district: string;
  upazila: string;
  internationalArea: string;
  displayLocation: string;
  images: string[];
  photojournalistName: string;
  category: string;
  newsCategory: string;
  newsTitle: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageTagline: string;
  currentNews: boolean;
  adminName: string;
  postDate: string;
  newsTag: [string];
  publishedDate: Date;
  publishedNews: boolean;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
};
export type TVideoNews = {
  _id: string;
  reporterName: string;
  reporterType: string;
  reportedDate: Date;
  newsType: string;
  division: string;
  district: string;
  upazila: string;
  internationalArea: string;
  displayLocation: string;
  images: string[];
  photojournalistName: string;
  category: string;
  newsCategory: string;
  newsTitle: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageTagline: string;
  currentNews: boolean;
  adminName: string;
  postDate: string;
  newsTag: string;
  publishedDate: Date;
  videoUrl: string;
  videioJornalistName: string;
  newsTagLine: string;
  publishedNews: boolean;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
  
};

export type TPhotoNews = {
  [x: string]: any;
  _id:string;
  title: string;
  description:string,
  imgTagline:string,
  images:[string]
  postDate:Date,
  adminName:string,
};
