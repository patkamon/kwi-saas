'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/shadcn/dialog"
import Image from 'next/image';
import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import CreateNovelWindow from "../window/createNovelWindow";
import { InputTextarea } from 'primereact/inputtextarea';
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Label } from "@/components/shadcn/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/accordion"
import artworkList from '@/data/artworks.json' assert { type: 'json' };

export interface Artwork {
    artist: string
    art: string
    date?: string
}

export const works: Artwork[] = artworkList as Artwork[];

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ImageDialog({setFormData}: {setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>}) {
    const [value, setValue] = useState('');

    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
      
        reader.onload = () => {
          const imageUrl = reader.result?.toString() || "";
          const img = document.createElement('img');
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            if (naturalWidth < 150 || naturalHeight < 150) {
              setError("Image must be at least 150 x 150 pixels.");
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


    return (
        <div>
            <label className="block text-sm font-medium mb-1">เลือกรูปภาพ</label>
            <Dialog>
                <DialogTrigger asChild>
                    {imgSrc ? <Image
                        src={imgSrc}
                        alt={`Photo by ${imgSrc}`}
                        className="aspect-[3/4] h-50 w-36 object-cover border-2 border-dashed border-pink-400 p-1"
                        width={160}
                        height={200}
                    /> : <Image alt='Selected Image' src="https://ew.com/thmb/WM51kzuKZSa0pvwUoNxu3M2fuG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hp-7-162d26cc5ed042c6ae2be534656a237e.jpg"
                        width="160" height="200" className="px-4 py-2 bg-white border-dashed border-2 border-pink-400 text-white rounded-md hover:bg-pink-200 hover:cursor-pointer"
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
                                <CreateNovelWindow works={works} imgSrc={imgSrc} onSelectFile={onSelectFile} />
                            </TabsContent>
                            <TabsContent value="ai">
                                <div className="flex flex-col w-[24rem]">
                                    <Label className="text-blue-900" htmlFor="picture">เลือกรูปภาพ: </Label>
                                    <Image
                                        src="https://ew.com/thmb/WM51kzuKZSa0pvwUoNxu3M2fuG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hp-7-162d26cc5ed042c6ae2be534656a237e.jpg"
                                        alt={`Photo by ew`}
                                        className="aspect-[3/4] h-fit w-fit object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                                        width={60}
                                        height={75}
                                    />
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-blue-900"> เจนด้วย AI: </h2>
                                        <h5 className="text-rose-400 text-xs">ฟีเจอร์อยู่ระหว่างการพัฒนา</h5>
                                    </div>
                                    <InputTextarea placeholder="Prompt 🪄✨ Be creative" disabled className="px-2 py-1 border bg-blue-50 border-gray-500 rounded-md" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-black text-white  rounded-md hover:bg-gray-900 hover:cursor-pointer"
                                        >
                                            เลือก
                                        </button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="collection">
                                <Label className="text-blue-900" htmlFor="picture">เลือกรูปภาพ: </Label>
                                <Image
                                    src="https://ew.com/thmb/WM51kzuKZSa0pvwUoNxu3M2fuG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hp-7-162d26cc5ed042c6ae2be534656a237e.jpg"
                                    alt={`Photo by ew`}
                                    className="aspect-[3/4] h-fit w-fit object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                                    width={60}
                                    height={75}
                                />
                                <Label className="text-blue-900" htmlFor="picture">คลัง: </Label>
                                <ScrollArea className="max-h-[500px] overflow-y-scroll scrollbar-hide w-[400px] rounded-md border px-4">
                                    <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]}>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <Label className="text-blue-900" htmlFor="picture">คลังอัปโหลด</Label>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='grid grid-cols-4 gap-2'>
                                                    {works.slice(4, 10).map((artwork, idx) => (
                                                        <figure key={artwork.artist + idx} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            <div className="overflow-hidden rounded-md">
                                                                <Image
                                                                    src={artwork.art}
                                                                    alt={`Photo by ${artwork.artist}`}
                                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                                    width={60}
                                                                    height={75}
                                                                />
                                                            </div>
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {artwork.artist}
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
                                                    {works.slice(1, 3).map((artwork, idx) => (
                                                        <figure key={artwork.artist + idx} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            <div className="overflow-hidden rounded-md">
                                                                <Image
                                                                    src={artwork.art}
                                                                    alt={`Photo by ${artwork.artist}`}
                                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                                    width={60}
                                                                    height={75}
                                                                />
                                                            </div>
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {artwork.artist}
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
                                                    {works.slice(0, 7).map((artwork, idx) => (
                                                        <figure key={artwork.artist + idx} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                                                            <div className="overflow-hidden rounded-md">
                                                                <Image
                                                                    src={artwork.art}
                                                                    alt={`Photo by ${artwork.artist}`}
                                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                                    width={60}
                                                                    height={75}
                                                                />
                                                            </div>
                                                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                                                <span className="font-semibold text-foreground">
                                                                    {artwork.artist}
                                                                </span>
                                                            </figcaption>
                                                        </figure>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </ScrollArea>
                                <DialogClose asChild>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-black text-white  rounded-md hover:bg-gray-900 hover:cursor-pointer"
                                        >
                                            เลือก
                                        </button>
                                    </div>
                                </DialogClose>
                            </TabsContent>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}