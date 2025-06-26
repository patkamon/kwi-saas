'"use client";'
import { InputFile } from '@/components/shadcn/inputFile';
import { Label } from "@/components/shadcn/label"
import Image from 'next/image';
import React, { useRef } from 'react';
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Artwork } from '../dialog/imageDialog';


export default function UploadImagelWindow({ works, imgSrc, onSelectFile }: { works: Artwork[], imgSrc?: string | null | undefined, onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        // Trigger the hidden file input click
        if (!fileInputRef.current) {
            return;
        }
        fileInputRef.current.click();
    };

    return (<React.Fragment>
        <Label className="text-blue-900" htmlFor="picture">เลือกรูปภาพ: </Label>
        {imgSrc ?
            <Image
                src={imgSrc || "/lovecraft_brew.jpeg"}
                alt={`Photo by ${imgSrc}`}
                className="aspect-[3/4] h-32 w-24 object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                width={60}
                height={75}
                onClick={handleImageClick}
            />
            :
            <Image
                src="/lovecraft_brew.jpeg"
                alt={`Photo by ew`}
                className="aspect-[3/4] h-32 w-24 object-cover mx-auto border-2 border-dashed border-pink-400 p-1"
                width={60}
                height={75}
                onClick={handleImageClick}
            />
        }
        <InputFile ref={fileInputRef} onChange={onSelectFile} text='Upload File:' />
        <Label className="text-blue-900" htmlFor="picture">อัปโหลดล่าสุด: </Label>
        <ScrollArea className="h-[400px] w-[400px] rounded-md border p-4">
            <div className='grid grid-cols-4 gap-2'>
                {works.map((artwork, idx) => (
                    <figure key={artwork.artist + idx} className="shrink-0 truncate flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src={artwork.art || "/lovecraft_brew.jpeg"}
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
        </ScrollArea>
    </React.Fragment>
    )
}
