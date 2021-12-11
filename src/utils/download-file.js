/**
 * @param options { { fileName: String; blob: Blob } }
 */
export const downloadFile = options => {
  const {blob, fileName} = options;

  const link = document.createElement('a');

  link.download = fileName;
  link.href = URL.createObjectURL(blob);

  link.click();
};
