import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone as MantineDropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useContext, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const Dropzone = (props: any) => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [files, setFiles] = useState<FileWithPath[]>([]);

    const thumb = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);

        return (
            <Image
                alt='previeww'
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });

    const handleUpload = async (file: any) => {
        await axiosInstance
            .post(
                '/facts/image',
                {
                    image: file[0],
                },
                {
                    headers: {
                        'authorization': `Bearer ${userInfo!.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((data) => {
                console.log(data);
                setFiles(file);
                props.setFieldValue(props.name, data.data.url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const previews = () => {
        const imageUrl = URL.createObjectURL(props.file.url);

        return <Image alt='preview' src={imageUrl} className='mt-4 h-[200px]' />;
    };

    return (
        <div>
            <MantineDropzone
                id={props.name}
                multiple={false}
                name={props.name}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.mp4, MIME_TYPES.svg]}
                onDrop={handleUpload}
            >
                <Text align='center'>Drop images here</Text>
            </MantineDropzone>

            <SimpleGrid
                // cols={12}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={files.length > 0 ? 'xl' : 0}
            >
                {thumb}
            </SimpleGrid>
        </div>
    );
};
