// @ts-nocheck
import { useEffect, useState } from 'react';
import { getToken } from 'utils/helpers';
import { baseURL } from 'utils/constants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MyEditor from 'ckeditor5-custom-build/build/ckeditor';

const config = {
    extraPlugins: [CustomUploadAdapterPlugin],

    toolbar: {
        items: [
            'heading',
            '|',
            'imageUpload',
            'bold',
            'italic',
            'fontSize',
            'fontColor',
            'fontFamily',
            'alignment',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'htmlEmbed',
            'horizontalLine',
            'subscript',
            'pageBreak',
        ],
    },
    language: 'ru',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
        ],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'h1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'h2', class: 'ck-heading_heading2' },
        ],
    },
};

function Editor(props: any) {
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (loaded) {
        return (
            <CKEditor
                editor={MyEditor}
                config={config}
                data={props.value ?? ''}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log({ data });
                    props.onChange(data);
                }}
                // onChange={(editor) => props.onChange(editor)}
            />
        );
    } else {
        return <h2> Editor is loading </h2>;
    }
}

function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    constructor(props: any) {
        this.loader = props;
        this.url = `${baseURL}/common/image`;
    }

    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest());

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', getToken());
    }

    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(
                    response && response.error ? response.error.message : genericErrorText
                );
            }

            resolve({
                default: response.url,
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest() {
        const data = new FormData();

        this.loader.file.then((result) => {
            data.append('image', result);
            this.xhr.send(data);
        });
    }
}

export default Editor;
