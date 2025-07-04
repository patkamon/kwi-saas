'"use client";'
import { InputFile } from '@/components/shadcn/inputFile';
import { Label } from "@/components/shadcn/label"
import Image from 'next/image';
import React, { useRef } from 'react';

export default function UploadImageWindow({ imgSrc, onSelectFile }: { imgSrc?: string | null | undefined, onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        {/* <Label className="text-blue-900" htmlFor="picture">อัปโหลดล่าสุด: </Label>
        <ScrollArea className="max-h-[400px] max-w-[400px] rounded-md border p-4">
            <div className='grid grid-cols-4 gap-2'>
                {imageCollection.map((image, idx) => (
                    <figure key={image.image_id + "uploaded"} className="shrink-0 truncate w-24 h-32 flex flex-col items-center p-1 hover:bg-white rounded-md hover:border-2 hover:border-pink-400" >
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
        </ScrollArea> */}
    </React.Fragment>
    )
}
