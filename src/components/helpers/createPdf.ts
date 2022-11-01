import jsPDF from "jspdf";

export const createPdf = (image: string) => {
  // Default export is A4 paper

  const doc = new jsPDF({ compress: true });
  var width = doc.internal.pageSize.getWidth();
  var height = doc.internal.pageSize.getHeight();

  // We let the images add all pages, therefore the first default page can be removed.
  doc.deletePage(1);
  doc.addPage();
  doc.addImage(image, "JPEG", 0, 0, width, height, "", "FAST"); //adds image to pdf document while at the same time trying to compress the image
  const result = doc.output("datauristring");
  return result;
};
