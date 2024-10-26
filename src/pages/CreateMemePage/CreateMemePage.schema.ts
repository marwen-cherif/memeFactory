import * as Yup from 'yup';

const createMemePageSchema = Yup.object().shape({
  picture: Yup.mixed().nullable().required('Picture is required'),
  description: Yup.string().required('Description is required'),
  texts: Yup.array().of(
    Yup.object().shape({
      content: Yup.string().required('Content is required'),
      x: Yup.number().required('X is required'),
      y: Yup.number().required('Y is required'),
    })
  ),
});

export default createMemePageSchema;
