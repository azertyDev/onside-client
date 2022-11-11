import { FormikProps } from 'formik';

interface InputFileProps {
    name: string;
    image: File[];
    setImage: React.Dispatch<React.SetStateAction<File[]>>;
    setCreateObjectURL: React.Dispatch<React.SetStateAction<string[]>>;
    createObjectURL: string[];
    setFieldValue: any;
}

export default InputFileProps;
