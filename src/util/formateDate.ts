// Mapping from English to Bangla digits
const englishToBangla: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

// Function to replace English digits with Bangla digits
const convertToBanglaDigits = (str: string): string => {
  return str.replace(/\d/g, (digit) => englishToBangla[digit]);
}

export const formatDate = (dateString: string | number | Date | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  // Format as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;
  // Convert digits to Bangla
  return convertToBanglaDigits(formattedDate);
}
