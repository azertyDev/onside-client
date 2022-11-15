import { Grid, Image, Tabs, TabsValue } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { CustomTabs } from 'components/common/tabs';
import { CreateSlidersForm } from './form';
import { ISlider } from 'src/interfaces/ISlider';
import { useRouter } from 'next/router';
import { SliderCard } from './Card';
import { Carousel } from '@mantine/carousel';
import { baseURL } from 'utils/constants';
import { Store } from 'utils/Store';

export const Slider = () => {
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [sliders, setSliders] = useState<any>([]);
    const [current, setCurrent] = useState<ISlider>();

    const fetchSliders = async () => {
        await axiosInstance
            .get(`/sliders`)
            .then(({ data }) => {
                setSliders(data);
            })
            .catch((error) => {
                console.log('Sliders fetch error: ', error);
            });
    };

    const onTabChange = (value: TabsValue) => {
        router.push(`/dashboard/${slug[0]}/${value}`);
    };

    const handleEdit = async (slide: ISlider) => {
        setCurrent(slide);
        onTabChange('2');
        // await axiosInstance
        //     .get(`/sliders/${slide.id}`)
        //     .then(({ data }) => {
        //         setCurrent(data);
        //         onTabChange('2');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    useEffect(() => {
        fetchSliders();
    }, [router]);

    return (
        <div className='w-full'>
            <CustomTabs onTabChange={onTabChange}>
                <Tabs.List>
                    <Tabs.Tab value='1'>Все</Tabs.Tab>
                    <Tabs.Tab value='2'>Создать</Tabs.Tab>
                    <Tabs.Tab value='3'>Slider</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <Grid>
                        {sliders?.map((item: ISlider) => {
                            return (
                                <Grid.Col key={item.id} lg={4}>
                                    <SliderCard
                                        id={item.id}
                                        {...item}
                                        handleEdit={() => handleEdit(item)}
                                    />
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateSlidersForm onTabChange={onTabChange} editCurrent={current} />
                </Tabs.Panel>

                <Tabs.Panel value='3' pt='xl'>
                    <Carousel
                        withIndicators
                        height={250}
                        slideSize='33.333333%'
                        slideGap='md'
                        breakpoints={[
                            { maxWidth: 'md', slideSize: '50%' },
                            { maxWidth: 'sm', slideSize: '100%', slideGap: 'xs' },
                        ]}
                        align='start'
                    >
                        {sliders?.map((item: ISlider) => {
                            return (
                                <Carousel.Slide key={item.id}>
                                    <Image
                                        height={200}
                                        src={item.image.url}
                                        alt={item.text}
                                        radius='md'
                                        caption={item.text}
                                    />
                                </Carousel.Slide>
                            );
                        })}
                    </Carousel>
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
