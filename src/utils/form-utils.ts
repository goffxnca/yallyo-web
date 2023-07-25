const min = (min: number, title: string) => ({
  value: min,
  message: `${title}ต้องไม่ต่ำกว่า ${min}`,
});

const max = (min: number, title: string) => ({
  value: max,
  message: `${title}ต้องไม่เกิน ${max}`,
});

const minLength = (minLength: number, title: string = "This field") => ({
  value: minLength,
  message: `${title} must be greater than or equal ${minLength} characters`,
});

const maxLength = (maxLength: number, title: string = "This field") => ({
  value: maxLength,
  message: `${title} must be less than or equal ${maxLength} characters`,
});

const EmailPattern = () => ({
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: `อีเมลไม่ถูกต้อง`,
});

const GenericPhonePattern = (title: string) => ({
  value: /^[0-9]{9,10}$/g,
  message: `หมายเลขโทรศัพท์มือถือต้องเป็นตัวเลขเท่านั้น ความยาว 9-10 ตัวอักษร`,
});

const MobilePhonePattern = (title: string) => ({
  value: /^[0-9]{10}$/g,
  message: `หมายเลขโทรศัพท์มือถือต้องเป็นตัวเลขเท่านั้น ความยาว 10 ตัวอักษร`,
});

const extractOnlyDirtiedField = (formData: any, dirtyFields: any) => {
  const mapResult: any = {};
  for (const [key, value] of Object.entries(dirtyFields)) {
    // console.log(`${key}: ${value}`);
    mapResult[key] = formData[key];
  }
  return mapResult;
};

export {
  min,
  max,
  minLength,
  maxLength,
  EmailPattern,
  MobilePhonePattern,
  GenericPhonePattern,
  extractOnlyDirtiedField,
};
