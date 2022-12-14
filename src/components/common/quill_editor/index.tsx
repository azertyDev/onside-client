import dynamic from 'next/dynamic';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

export const Editor = (props: SunEditorReactProps) => {
    return (
        <SunEditor
            {...props}
            placeholder='Ma`lumotlarni kiriting...'
            lang='ru'
            setOptions={{
                height: 'auto',
                defaultTag: 'div',
                mode: 'classic',
                buttonList: [
                    ['undo', 'redo'],
                    ['image', 'video'],
                    [
                        'fontSize',
                        'formatBlock',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'paragraphStyle',
                        'subscript',
                        'superscript',
                        'fontColor',
                        'hiliteColor',
                        'align',
                        'horizontalRule',
                        'outdent',
                        'indent',
                        'list',
                        'removeFormat',
                    ],
                    [
                        'table',
                        // 'fullScreen'
                    ],
                    [
                        'showBlocks',
                        // 'codeView'
                    ],
                ],
            }}
        />
    );
};
