'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/shadcn/dialog"
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { InputTextarea } from 'primereact/inputtextarea';
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Label } from "@/components/shadcn/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/accordion"
import { generateImage } from "../api/post";
import UploadImagelWindow from "../window/uploadImageWindow";
import { getPublicImageUrls } from "../api/get";
import { ImageInterface } from "@/interface/image";
import ReduceCreditDialog from "./reduceCreditDialog";



// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;

export default function ImageDialog({ setFormData, selected_img, resetSignal = 0 }:
    {
        setFormData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
        selected_img?: string | undefined,
        resetSignal?: number
    }) {
    const [value, setValue] = useState('');

    const [imgSrc, setImgSrc] = useState('');
    const [imagePublicCollection, setImagePublicCollection]= useState([] as ImageInterface[]) ;
    const [imageUploadCollection, setImageUploadCollection] = useState([] as ImageInterface[]);
    const [imageGeneratedCollection, setImageGeneratedCollection] = useState([] as ImageInterface[]);

    useEffect(() => {
        setImgSrc(selected_img || "");
      }, [resetSignal]);

    useEffect(() => {
        async function getImage(type: string, setFunc: React.Dispatch<React.SetStateAction<ImageInterface[]>>) {
            const data = await getPublicImageUrls(type)
            setFunc(data);
        }
        getImage('public', setImagePublicCollection)
        getImage('upload', setImageUploadCollection)
        getImage('gen', setImageGeneratedCollection)

    },[])


    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result?.toString() || "";
            const img = document.createElement('img');
            img.onload = () => {
                const { naturalWidth, naturalHeight } = img;
                if (naturalWidth < 150 || naturalHeight < 150) {
                    //   setError("Image must be at least 150 x 150 pixels.");
                    setImgSrc("");
                    return;
                }

                setImgSrc(imageUrl); // show preview
                setFormData((prev) => ({ ...prev, image: file })); // store file for upload
            };
            img.src = imageUrl;
        };

        reader.readAsDataURL(file); // load preview
    };

    function callGenerateImage() {
        generateImage(value).then((res) => {
            if (res) {
                setImgSrc(`data:image/png;base64,${res.image}`);
                setFormData((prev) => ({ ...prev, image_id: res.image_id, image:res.image }))
            } else {
                console.error("Error generating image:", res.error);
            }
        }
        ).catch((error) => {
            console.error("Error generating image:", error);
        }
        );
    }


    return (
        <div>
            <label className="block text-sm font-medium mb-1">เลือกรูปภาพ</label>
            <Dialog>
                <DialogTrigger asChild>
                    {imgSrc ? <Image
                        src={imgSrc}
                        alt={`Photo by ${imgSrc}`}
                        className="max-w-32 max-h-40 min-w-32 min-h-40 aspect-[3/4] h-fit w-fit object-cover mx-4 my-2 border-2 border-dashed border-pink-400 p-1"
                        width={256}
                        height={256}
                    /> : <Image alt='Selected Image'
                        src={
                            selected_img ?
                                selected_img :
                                "/lovecraft_brew.jpeg"
                        }
                        className="max-w-32 max-h-40 min-w-32 min-h-40 aspect-[3/4] h-fit w-fit object-cover mx-4 my-2 border-2 border-dashed border-pink-400 p-1"
                        width={256}
                        height={256}
                   
                   />}
                </DialogTrigger>
                <DialogContent className='flex justify-center'>
                    <DialogHeader>
                        <Tabs defaultValue="upload">
                            <DialogTitle>
                                <TabsList className="grid grid-cols-3">
                                    <TabsTrigger value="upload">อัปโหลด</TabsTrigger>
                                    <TabsTrigger value="ai">AI เจนภาพ</TabsTrigger>
                                    <TabsTrigger value="collection">คลัง</TabsTrigger>
                                </TabsList>
                            </DialogTitle>
                            <TabsContent value="upload">
                                <UploadImagelWindow imageCollection={imageUploadCollection} imgSrc={imgSrc || selected_img || "/lovecraft_brew.jpeg"} onSelectFile={onSelectFile} />
                            </TabsContent>
                            <TabsContent value="ai">
                                <div className="flex flex-col w-[24rem]">
                                    <Label className="text-blue-900" htmlFor="picture">เลือกรูปภาพ: </Label>
                                    <Image
                                        src={imgSrc || selected_img || "/lovecraft_brew.jpeg"}
                                        alt={`Photo by ew`}
                                        className="max-w-24 max-h-32 min-w-24 min-h-32 aspect-[3/4] h-fit w-fit object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                                        width={60}
                                        height={75}
                                    />
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-blue-900"> เจนด้วย AI: </h2>
                                        <h5 className="text-rose-400 text-xs">ใช้ภาษาอังกฤษ</h5>
                                    </div>
                                    <InputTextarea placeholder="Prompt 🪄✨ Be creative" className="px-2 py-1 border bg-blue-50 border-gray-500 rounded-md" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                                    
                                    <ReduceCreditDialog cost={1} handleFunction={callGenerateImage} />
                                    
                                </div>
                            </TabsContent>
                            <TabsContent value="collection">
                                <Label className="text-blue-900" htmlFor="picture">เลือกรูปภาพ: </Label>
                                <Image
                                    src={imgSrc || selected_img || "/lovecraft_brew.jpeg"}
                                    alt={`Photo by ew`}
                                    className="max-w-24 max-h-32 min-w-24 min-h-32 aspect-[3/4] h-fit w-fit object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                                    width={256}
                                    height={256}
                                />
                                <Label className="text-blue-900" htmlFor="picture">คลัง: </Label>
                                <ScrollArea className="max-h-[500px] overflow-y-scroll scrollbar-hide w-[400px] rounded-md border px-4">
                                    <Accordion type="multiple" defaultValue={[]}>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <Label className="text-blue-900" htmlFor="picture">คลังอัปโหลด</Label>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='grid grid-cols-4 gap-2'>
                                                    {imageUploadCollection.map((image, idx) => (
                                                        <figure key={image.image_id + "upload"} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            <div className="overflow-hidden rounded-md">
                                                                <Image
                                                                    src={image.image_path || "/lovecraft_brew.jpeg"}
                                                                    alt={`Photo by ${image.created_by}`}
                                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                                    width={60}
                                                                    height={75}
                                                                />
                                                            </div>
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {image.created_by}
                                                                </span>
                                                            </figcaption>
                                                        </figure>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>
                                                <Label className="text-blue-900" htmlFor="picture">คลัง AI เจน</Label>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='grid grid-cols-4 gap-2'>
                                                    {imageGeneratedCollection.map((image, idx) => (
                                                        <figure key={image.image_id + "ai_gen"} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            <div className="overflow-hidden rounded-md">
                                                                <Image
                                                                    src={image.image_path || "/lovecraft_brew.jpeg"}
                                                                    alt={`Photo by ${image.created_by}`}
                                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                                    width={256}
                                                                    height={256}
                                                                />
                                                            </div>
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {image.created_by}
                                                                </span>
                                                            </figcaption>
                                                        </figure>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>
                                                <Label className="text-blue-900" htmlFor="picture">คลังสาธารณะ</Label>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='grid grid-cols-4 gap-2'>
                                                    {imagePublicCollection.map((image, idx) => (
                                                        <figure key={image.image_id+ "public"} className="shrink-0 truncate flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            {/* <div className="overflow-hidden rounded-md"> */}
                                                                <Image
                                                                    src={image.image_path || "/lovecraft_brew.jpeg"}
                                                                    alt={`Photo by ${image.created_by}`}
                                                                    className="aspect-[3/4] h-full w-full object-cover"
                                                                    width={256}
                                                                    height={256}
                                                                />
                                                            {/* </div> */}
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {image.created_by}
                                                                </span>
                                                            </figcaption>
                                                        </figure>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </ScrollArea>
                            </TabsContent>
                            <DialogFooter className="flex justify-end mt-2">
                                <DialogClose asChild>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-black text-white  rounded-md hover:bg-gray-900 hover:cursor-pointer"
                                    >
                                        เลือก
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}