import { FormikImageUpload } from './FormikImageUpload';
import { FormikInput } from './FormikInput';
import { FormikSelect } from './FormikSelect';
import { FormikTextarea } from './FormikTextarea';
import { FormikPhone } from './FormikPhone';
import { FormikPassword } from './FormikPassword';
import { FormikDateTimeInput } from './FormikDateTimeInput';

export const FormikControl = (props: any) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'password':
            return <FormikPassword {...rest} />;
        case 'input':
            return <FormikInput {...rest} />;
        case 'textarea':
            return <FormikTextarea {...rest} />;
        case 'phone':
            return <FormikPhone {...rest} />;
        case 'select':
            return <FormikSelect {...rest} />;
        case 'dateTime':
            return <FormikDateTimeInput {...rest} />;
        case 'imageUpload':
            return <FormikImageUpload {...rest} />;
        default:
            return null;
    }
};

export default FormikControl;
