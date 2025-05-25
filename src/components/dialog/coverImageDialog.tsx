import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import CreateNovelWindow from "../window/createNovelWindow";


export interface Artwork {
    artist: string
    art: string
    date?: string
}

export const works: Artwork[] = [
    {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
        date: "2023-10-01",
    },
    {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
        date: "2023-10-02",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
        date: "2023-10-02",
    },
    {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
        date: "2023-10-02",
    },
    {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
        date: "2023-10-02",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    }, {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
]

export default function CoverImageDialog() {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <Dialog>
                <DialogTrigger asChild>
                    <Image alt='cover image' src="https://ew.com/thmb/WM51kzuKZSa0pvwUoNxu3M2fuG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hp-7-162d26cc5ed042c6ae2be534656a237e.jpg"
                        width="160" height="200" className="px-4 py-2 bg-white border-dashed border-2 border-pink-400 text-white rounded-md hover:bg-pink-200 hover:cursor-pointer"
                    />
                </DialogTrigger>
                <DialogContent className='flex justify-center'>
                    <DialogHeader>
                        <Tabs defaultValue="upload">
                            <DialogTitle>
                                <TabsList>
                                    <TabsTrigger value="upload">Upload</TabsTrigger>
                                    <TabsTrigger value="ai">Generate</TabsTrigger>
                                    <TabsTrigger value="collection">Collection</TabsTrigger>
                                </TabsList>
                            </DialogTitle>

                            <TabsContent value="upload">
                                <CreateNovelWindow works={works} />
                            </TabsContent>
                            <TabsContent value="ai">Generate using AI</TabsContent>
                            <TabsContent value="collection">Choose from collection</TabsContent>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}