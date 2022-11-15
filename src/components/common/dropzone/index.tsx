import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

export const Dropzone = (props: any) => {
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

    const handleUpload = (image: any) => {
        console.log(image);

        setFiles(image);
        props.setFieldValue('image', image);
    };

    // const previews = props.images.map((image: FileWithPath, index: number) => {
    //     const imageUrl = URL.createObjectURL(image);

    //     return <Image alt='preview' key={index} src={imageUrl} />;
    // });

    const previews = () => {
        const imageUrl = URL.createObjectURL(props.images.url);

        return <Image alt='preview' src={imageUrl} />;
    };

    return (
        <div>
            <MantineDropzone
                id={props.id}
                multiple={false}
                name={props.name}
                accept={IMAGE_MIME_TYPE}
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
