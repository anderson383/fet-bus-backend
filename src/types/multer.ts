export interface IMulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer; // Optional property for raw file data

  // Add methods if needed, for example:
  getStream(): NodeJS.ReadableStream; // Method to get a readable stream of the file data
}
