'use client';
import { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { Camera, Cloud, File, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { startFileUpload } from '@/lib/actions';
import { set } from 'date-fns';
import { useToast } from '../ui/use-toast';
import { Progress } from '../ui/progress';
import { User } from '@prisma/client';

interface FileDropzoneProps {
  onFileUpload: (downloadURL: string, fileName: string) => void;
  user: User;
}

const AvatarUploadDropzone: React.FC<FileDropzoneProps> = ({
  onFileUpload,
  user,
}) => {
  const [file, setFile] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { toast } = useToast();

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    startSimulatedProgress();

    try {
      await Promise.all(
        files.map(async (file) => {
          const uploadResult = await startFileUpload({ file });
          if (uploadResult) {
            const { downloadURL } = uploadResult;
            onFileUpload(downloadURL, file.name);
          } else {
            throw new Error('Upload failed');
          }
        })
      );
      setUploadProgress(100);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive',
      });
      setUploadProgress(0);
    } finally {
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
    }
  };

  const { open, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      // Only taking the first file, as multiple is set to false
      setFile(acceptedFiles);
    },

    multiple: true,
    maxFiles: 6,
  });

  return (
    <>
      <h1>Add a photo</h1>
      <Dropzone multiple={false} maxFiles={1} onDrop={handleUpload}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <>
            {user.photoURL ? (
              <div {...getRootProps()} onClick={(e) => e.stopPropagation()}>
                
                <label className='hover:cursor-pointer relative flex items-center justify-center w-[150px] h-[150px] rounded-full overflow-hidden'>
                  <div className='hover:cursor-pointer hover:backdrop-blur-xs opacity-0 hover:opacity-100 absolute flex flex-col items-center justify-center w-full h-full'>
                    <Camera className='h-6 w-6 text-white mb-2 ' />
                    <p className='text-white'>Add New Photo</p>
                    <input
                  {...getInputProps()}
                  type='file'
                  id='dropzone-file'
                  className='hidden'
                />
                  </div>
                  <Image
                    width={200}
                    height={200}
                    src={user.photoURL}
                    alt='Profile'
                    className='object-fill w-full h-full'
                  />
                </label>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className='border m-4 border-dashed border-gray-300 w-[150px] h-[150px] rounded-full'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex items-center justify-center w-full h-full rounded-full'>
                  <label
                    htmlFor='dropzone-file'
                    className='flex flex-col items-center justify-center w-full h-full rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100'
                  >
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <Cloud className='h-6 w-6 text-zinc-500 mb-2 ' />
                      <p className='mb-2 text-sm text-zinc-700 text-center'>
                        <span className='font-semibold'>Click to Upload </span>
                        or drag and drop
                      </p>
                      <p className='text-xxs text-zinc-500 text-center'>
                        (Only *.jpeg and *.png images will be accepted)
                      </p>
                    </div>

                    {isUploading ? (
                      <div className='w-full mt-4 mb-4 max-w-xs mx-auto'>
                        <Progress
                          value={uploadProgress}
                          className='h-1 w-full bg-zinc-200'
                        />
                      </div>
                    ) : null}

                    <input
                      {...getInputProps()}
                      type='file'
                      id='dropzone-file'
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </Dropzone>
    </>
  );
};

export default AvatarUploadDropzone;
