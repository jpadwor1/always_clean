/* eslint-disable @next/next/no-img-element */
"use client";

import "./blog.module.css";
import "./post.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type StorageReference,
} from "firebase/storage";
import { app } from "@/config/firebase";
import { Bot, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/app/_trpc/client";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post as Blog } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogEditor = ({ initialData }: { initialData?: Blog }) => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [storageRef, setStorageRef] = useState<StorageReference | null>(null);
  const [media, setMedia] = useState(initialData?.img ?? "");
  const [value, setValue] = useState(initialData?.desc ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [progress, setProgress] = useState(media.length > 0 ? 100 : 0);
  const [catSlug, setCatSlug] = useState(initialData?.category ?? "");
  const [slugError, setSlugError] = useState<string>("");
  const [postSEO, setPostSEO] = useState({
    metaDescription: initialData?.metaDescription ?? "",
    excerpt: initialData?.excerpt ?? "",
    slug: initialData?.slug ?? "",
    publishDate: initialData?.publishDate ?? "",
    keywords: initialData?.keywords ?? "",
  });
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);


  const createBlogPost = trpc.createPost.useMutation();
  const writeWithAi = trpc.writeWithAi.useMutation();
  const updateBlogPost = trpc.updatePost.useMutation();
  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      if (!file) return;
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      setStorageRef(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        },
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
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const { refetch: verifySlug, error } = trpc.uniqueSlug.useQuery(
    postSEO.slug,
    {
      enabled: false,
    },
  );

  const handleSubmit = async () => {
    const isUniqueSlug = await verifySlug();
    const postData = {
      title,
      desc: value,
      img: media,
      slug: postSEO.slug,
      catSlug: catSlug || "style",
      postSEO,
    };
    if (isUniqueSlug && !error && !initialData) {
      createBlogPost.mutate(postData, {
        onSuccess: () => {
          toast({
            title: "Post Created",
            description: "Your post has been created successfully",
          });
          router.push("/blog");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          if (storageRef) {
            deleteObject(storageRef)
              .then(() => {
                console.log("File deleted successfully");
              })
              .catch((error) => {
                console.error("Error deleting file:", error);
              });
          }
        },
      });
    }
    else if (initialData && !error) {
      updateBlogPost.mutate(
        { id: initialData.id, ...postData },
        {
          onSuccess: () => {
            toast({
              title: "Post Updated",
              description: "Your post has been updated successfully",
            });
            router.push(`/blog/${postData.slug}`);
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          },
        },
      );
    }

    if (!isUniqueSlug) {
      setSlugError("Slug is not unique. Please change it.");
    }


  };

  const handleGenerate = () => {
    setIsGenerating(true);
    writeWithAi.mutate(topic, {
      onSuccess: (data) => {
        setValue(data?.blogBody ?? "");
        setTitle(data?.blogTitle ?? "");
        setPostSEO((prev) => ({
          ...prev,
          metaDescription: data?.blogMetaDescription ?? "",
          excerpt: data?.blogExcerpt ?? "",
          keywords: data?.blogTags ?? "",
        }));
        setOpen(false);
        setIsGenerating(false);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Oops, something went wrong generating the blog post.",
          description: "Try again later.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <div className="flex w-full items-end justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex flex-row items-center justify-center space-x-2 rounded-full bg-green-500 px-4 py-2 shadow-lg">
            <Bot className="h-4.5 w-4.5" />{" "}
            <p className="tracking-wide">Write with AI</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Just enter a topic and we will write a post for you!
              </DialogTitle>
              <DialogDescription>
                Make sure to include any specifics you want to include.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Enter a topic"
              onChange={(e) => setTopic(e.target.value)}
            />
            <Button onClick={handleGenerate}>
              {isGenerating ? (
                <span className="flex flex-row items-center space-x-2">
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </Button>
            <DialogFooter>
              <span className="text-sm text-muted-foreground">
                Example Prompt:{" "}
                <span className="font-bold">
                  Write an article about the difference between being a US
                  military officers or enlisted member
                </span>
              </span>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="edit" className="min-h-screen w-full">
        <TabsList>
          <TabsTrigger value="edit">Edit Post</TabsTrigger>
          <TabsTrigger value="view">Preview Post</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <div className="relative flex flex-col space-y-2">
            <div className="mb-2 md:grid md:grid-cols-2  gap-2">
              <div className="flex flex-col space-y-2">
                <Input
                  type="text"
                  placeholder="Title"
                  className=""
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setPostSEO(() => ({
                      ...postSEO,
                      slug: slugify(e.target.value),
                    }));
                  }}
                  value={title}
                />
                <Input
                  type="text"
                  placeholder="Slug"
                  className=""
                  onChange={(e) =>
                    setPostSEO(() => ({ ...postSEO, slug: e.target.value }))
                  }
                  value={postSEO.slug}
                />
                {slugError && <p className="text-red-500">{slugError}</p>}
                <Input
                  type="text"
                  placeholder="Keywords"
                  onChange={(e) =>
                    setPostSEO(() => ({ ...postSEO, keywords: e.target.value }))
                  }
                  value={postSEO.keywords}
                />
                <div className="flex flex-row items-center space-x-2">
                  <Label htmlFor="date" className="w-1/2 min-w-fit max-w-fit">
                    Publish Date
                  </Label>
                  <Input
                    name="date"
                    type="date"
                    className="my-2 max-w-fit"
                    onChange={(e) =>
                      setPostSEO(() => ({
                        ...postSEO,
                        publishDate: e.target.value,
                      }))
                    }
                    value={postSEO.publishDate}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Textarea
                  placeholder="Meta Description"
                  className=""
                  onChange={(e) =>
                    setPostSEO(() => ({
                      ...postSEO,
                      metaDescription: e.target.value,
                    }))
                  }
                  value={postSEO.metaDescription}
                />
                <Textarea
                  placeholder="Excerpt"
                  onChange={(e) =>
                    setPostSEO(() => ({ ...postSEO, excerpt: e.target.value }))
                  }
                  value={postSEO.excerpt}
                />
              </div>
            </div>

            <div className="relative md:my-4 flex md:flex-row flex-col md:space-y-0 space-y-8 md:items-center justify-between">
              <div className="flex flex-col items-start">
                <Label htmlFor="date" className="mb-1 min-w-fit max-w-fit">
                  Post Category
                </Label>
                <select
                  className="max-w-fit rounded-md px-4 py-2"
                  onChange={(e) => setCatSlug(e.target.value)}
                >
                  <option value="pool-maintenance-tips">Pool Maintenance Tips</option>
                  <option value="water-chemistry">Water Chemistry and Balancing</option>
                  <option value="cleaning-equipment">Pool Cleaning Equipment</option>
                  <option value="filter-care">Filter Maintenance and Care</option>
                  <option value="algae-prevention">Algae Prevention and Removal</option>
                  <option value="seasonal-pool-care">Seasonal Pool Care</option>
                  <option value="pool-repair-guide">Pool Repair and Troubleshooting</option>
                  <option value="energy-efficient-pools">Energy-Efficient Pool Solutions</option>
                  <option value="pool-safety">Pool Safety Tips</option>
                  <option value="eco-friendly-pools">Eco-Friendly Pool Practices</option>
                  <option value="local-pool-services">Local Pool Services in Florence, AZ</option>
                  <option value="client-success-stories">Client Success Stories</option>
                </select>
              </div>
              <div className="flex flex-col md:items-end">
                <Label htmlFor="image" className="mb-2 min-w-fit max-w-fit">
                  Upload Post Image
                </Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  style={{}}
                />
                {progress === 100 ? (
                  <div className="mt-2 flex flex-row space-x-1">
                    <Check className="h-6 w-6 self-center text-green-400" />
                    <p className="self-center text-green-400">
                      Upload Complete
                    </p>
                  </div>
                ) : null}
                {progress !== 100 && (
                  <p className="text-red-500">
                    A main image is required. Please upload an image.
                  </p>
                )}
              </div>
            </div>
            <div className="relative w-full md:mt-0 pt-8">
              <EditorToolbar />
              <ReactQuill
                className="h-[450px] w-full rounded-sm bg-white"
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
                placeholder="Tell your story..."
              />
            </div>
            <Button
              className="mt-4 w-1/4 self-end"
              onClick={handleSubmit}
              disabled={progress !== 100}
            >
              Publish
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="view">
          <div className="mx-auto max-w-3xl p-4">
            {/* Preview Blog Title */}
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>

            {/* Preview Meta Information (Author, Date, Category) */}
            <div className="mb-6 flex items-center justify-between text-sm text-foreground">
              <div>
                <p>
                  By <span className="font-semibold">Author Name</span>
                </p>
                <p>Published on {postSEO.publishDate}</p>
              </div>
              <div>
                <p className="rounded-full bg-gray-200 px-3 py-1 text-xs">
                  {catSlug.replace("-", " ")}
                </p>
              </div>
            </div>

            {/* Preview Main Image */}
            {file && (
              <div className="mb-6">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Post Preview"
                  className="max-h-96 w-full rounded-md object-cover"
                />
              </div>
            )}

            {/* Preview Content */}
            <article className="post-content prose lg:prose-xl mx-auto">
              {/* Render the content as HTML */}
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </article>

            {/* Preview Meta Description and Excerpt (If you want to show them) */}
            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Meta Description</h2>
              <p className="text-gray-600">{postSEO.metaDescription}</p>
            </div>
            <div className="mt-4">
              <h2 className="mb-2 text-lg font-semibold">Excerpt</h2>
              <p className="text-gray-600">{postSEO.excerpt}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default BlogEditor;
