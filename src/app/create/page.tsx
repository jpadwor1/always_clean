'use client';

import Image from 'next/image';
import styles from './CreatePage.module.css';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { useRouter } from 'next/navigation';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '@/config/firebase';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '../_trpc/client';
import { toast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';


const CreatePage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState('');
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('maintence');
 const createPost = trpc.createPost.useMutation();

 const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      if (!file) return;
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    if (file) {
      upload();
    }
  }, [file]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleSubmit = async () => {
    const postData = {
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || 'style', 
        };
    console.log(postData);

    createPost.mutate(postData, {
        onSuccess: () => {
            toast({
                title: 'Post Created',
                description: 'Your post has been created successfully'
            })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message
            })
        }
    })
    };

  return (
    <MaxWidthWrapper>
      <div className='relative flex flex-col'>
        <input
          type='text'
          placeholder='Title'
          className='p-[50px] text-2xl border-none outline-none bg-transparent text-gray-900'
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-row items-center justify-between mb-4 relative">
        <select
          className='px-4 py-6 mx-10 max-w-fit rounded-md'
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value='maintenance'>Pool Maintenance Tips</option>
          <option value='equipment'>Pool Equipment</option>
          <option value='safety'>Pool Safety</option>
          <option value='design'>Pool Design Ideas</option>
          <option value='care'>Seasonal Pool Care</option>
          <option value='troubleshooting'>Troubleshooting Common Pool Problems</option>
        </select>
        <button className='bg-blue-600 rounded-full px-2 py-2' onClick={() => setOpen(!open)}>
            <Plus className='h-6 w-6 text-blue-300' />
          </button>
          {open && (
            <div className='flex absolute z-40 bg-transparent gap-2 w-fit right-12'>
              <input
                type='file'
                id='image'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
                style={{ display: 'none' }}
              />
              <button className={styles.addButton}>
                <label htmlFor='image'>
                  <Image src='/blog/image.png' alt='' width={24} height={24} />
                </label>
              </button>
              <button className={styles.addButton}>
                <Image src='/blog/external.png' alt='' width={24} height={24} />
              </button>
              <button className={styles.addButton}>
                <Image src='/blog/video.png' alt='' width={24} height={24} />
              </button>
            </div>
          )}
          </div>
        <div className='flex gap-2 h-[50vh] px-6 relative'>
          
          <ReactQuill
            className='w-full'
            theme='bubble'
            value={value}
            onChange={setValue}
            placeholder='Tell your story...'
          />
        </div>
        <Button className='w-1/4 self-end mt-4' onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default CreatePage;
