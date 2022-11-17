import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone as MantineDropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';

export const Dropzone = (props: any) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    console.log(files);

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

    const handleUpload = (file: any) => {
        console.log(file);

        setFiles(file);
        props.setFieldValue('image', file);
    };

    // const previews = props.images.map((image: FileWithPath, index: number) => {
    //     const imageUrl = URL.createObjectURL(image);

    //     return <Image alt='preview' key={index} src={imageUrl} />;
    // });

    const previews = () => {
        const imageUrl = URL.createObjectURL(props.file.url);

        return <Image alt='preview' src={imageUrl} />;
    };

    return (
        <div>
            <MantineDropzone
                id={props.id}
                multiple={false}
                name={props.name}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.mp4, MIME_TYPES.svg]}
                onDrop={handleUpload}
            >
                <Text align='center'>Drop images here</Text>
            </MantineDropzone>

            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {thumb}
            </SimpleGrid>
        </div>
    );
};
