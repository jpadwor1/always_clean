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
import { Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '../_trpc/client';
import { toast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const Page = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState('');
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [catSlug, setCatSlug] = useState('maintence');
  const [postSEO, setPostSEO] = useState({
    metaDescription: '',
    excerpt: '',
    slug: '',
    publishDate: '',
  });
  const createPost = trpc.createPost.useMutation();

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
          setProgress(progress);
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
      postSEO,
    };

    createPost.mutate(postData, {
      onSuccess: () => {
        toast({
          title: 'Post Created',
          description: 'Your post has been created successfully',
        });
        router.push('/blog');
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
        });
      },
    });
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
        <textarea
          placeholder='Meta Description'
          className='ml-10 text-lg border-none outline-none bg-transparent text-gray-900'
          onChange={(e) =>
            setPostSEO(() => ({ ...postSEO, metaDescription: e.target.value }))
          }
        />
        <input
          type='text'
          placeholder='Slug'
          className='p-0 ml-10 my-4 text-lg border-none outline-none bg-transparent text-gray-900'
          onChange={(e) =>
            setPostSEO(() => ({ ...postSEO, slug: e.target.value }))
          }
        />
        <textarea
          placeholder='Excerpt'
          className='ml-10 my-6 text-lg border-none outline-none bg-transparent text-gray-900'
          onChange={(e) =>
            setPostSEO(() => ({ ...postSEO, excerpt: e.target.value }))
          }
        />
        <div className='flex flex-row items-center space-x-2'>
          <Label htmlFor='date' className='ml-10 text-lg'>
            Publish Date
          </Label>
          <Input
            name='date'
            type='date'
            className='w-1/4 my-4 bg-transparent'
            onChange={(e) =>
              setPostSEO(() => ({ ...postSEO, publishDate: e.target.value }))
            }
          />
        </div>

        <div className='flex flex-row items-center justify-between mb-4 relative'>
          <select
            className='px-4 py-6 mx-10 max-w-fit rounded-md'
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value='cleaning'>Pool Cleaning Tips</option>
            <option value='equipment'>Pool Equipment</option>
            <option value='safety'>Pool Safety</option>
            <option value='design'>Pool Design Ideas</option>
            <option value='seasonal care'>Seasonal Pool Care</option>
            <option value='troubleshooting'>
              Troubleshooting Common Pool Problems
            </option>
          </select>
          <button
            className='bg-blue-600 rounded-full px-2 py-2'
            onClick={() => setOpen(!open)}
          >
            <Plus className='h-6 w-6 text-blue-300' />
          </button>
          {open && (
            <div className='flex absolute z-40 bg-transparent gap-2 w-fit right-12'>
              {progress === 100 ? (
                <>
                  <Check className='h-6 w-6 text-green-400 self-center' />
                  <p className='text-green-400 self-center'>Upload Complete</p>
                </>
              ) : null}
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

export default Page;
