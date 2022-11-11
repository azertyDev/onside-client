import { useState } from 'react';
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

export const Dropzone = (props: any) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const handleUpload = (url: any) => {
        props.setFieldValue('image', url);
        URL.revokeObjectURL(url);
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                alt='preview'
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => handleUpload(URL.revokeObjectURL(imageUrl)) }}
            />
        );
    });

    return (
        <div>
            <MantineDropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                <Text align='center'>Drop images here</Text>
            </MantineDropzone>

            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
        </div>
    );
};
