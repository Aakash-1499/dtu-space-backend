import Joi from "joi";
export const schema = Joi.object().keys({
  title: Joi.string().allow(""),
  content: Joi.string().allow(""),
  pdfUrl: Joi.string().allow(""),
  category: Joi.string().allow(""),
  subCategory: Joi.string().allow(""),
  previewImage: Joi.string().allow(""),
});
