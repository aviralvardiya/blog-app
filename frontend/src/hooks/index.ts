import { useEffect, useState } from "react"
import axios from "axios";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`https://backend.rglairgamer.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlog(response.data);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`https://backend.rglairgamer.workers.dev/api/v1/blog/bulk`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data.fetchedPosts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}