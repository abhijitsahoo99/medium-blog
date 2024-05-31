import { Skeleton } from "@mui/material"

const Blogs=() => {
  return (
    <div className="w-[58%]">
        <BlogSkeleton  />
        <BlogSkeleton  />
        <BlogSkeleton  />
    </div>
  )
}

const BlogSkeleton =() => {
    return (
        <div className="flex gap-8">
            <div className="ml-0">
            <div className="flex items-center gap-4">
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="rounded" width={150} height={10} />
            </div>
            <div className="mt-5 flex flex-col gap-4">
                <Skeleton variant="rounded" width={500} height={10} />
                <Skeleton variant="rounded" width={400} height={10} />
            </div>
            </div>
            <div className="pb-4">
                <Skeleton variant="rectangular" width={180} height={150} />
            </div>
        </div>
    )
}

export default Blogs
