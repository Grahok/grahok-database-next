import { ObjectId } from 'mongodb';

export default function mongooseDocumentToPlainObject(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (value instanceof ObjectId) {
        return value.toString();
      }
      return value;
    })
  );
}
